import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 导入GSAP和插件
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 创建Base64编码的占位图片
const createPlaceholderImage = () => {
  // 创建一个简单的SVG图像并转换为base64格式
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
      <rect width="300" height="200" fill="#cccccc" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="#666666">图片加载中</text>
    </svg>
  `;
  
  // 转换为base64
  const base64Svg = btoa(unescape(encodeURIComponent(svgContent.trim())));
  const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;
  
  // 创建一个<img>元素并添加到页面上
  const img = document.createElement('img');
  img.src = dataUrl;
  img.id = 'placeholder-image';
  img.style.display = 'none';
  document.body.appendChild(img);
  
  // 修复图片的src属性
  const fixBrokenImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('error', function(e) {
        console.log("图片加载错误，使用占位图替换:", this.src);
        if (this.src.includes('placeholder-image.jpg') || 
            this.src.includes('project') || 
            this.src.includes('assets/images/') ||
            !this.src.startsWith('data:')) {
          this.src = dataUrl;
        }
      }, { once: true });
    });
  };
  
  // 在页面加载完成后修复图片
  window.addEventListener('load', fixBrokenImages);
  
  // 定期检查和修复图片
  setInterval(fixBrokenImages, 2000);
  
  return dataUrl;
};

// 全局保存占位图地址以供其他组件使用
window.placeholderImageUrl = createPlaceholderImage();

// Framer Motion 缓动函数修复
// 修补Framer Motion的动画方法，防止cubic-bezier错误
const patchFramerMotion = () => {
  // 等待Framer Motion加载
  setTimeout(() => {
    // 如果能够访问帧元素的animate方法的原型
    if (window.Element && window.Element.prototype.animate) {
      const originalAnimate = window.Element.prototype.animate;
      
      // 替换animate方法
      window.Element.prototype.animate = function(keyframes, options) {
        // 检查并修复easing选项
        if (options && options.easing) {
          // 如果easing是数组(cubic-bezier格式)，替换为标准easing名称
          if (Array.isArray(options.easing) || 
              (typeof options.easing === 'string' && options.easing.includes('cubic-bezier'))) {
            options.easing = 'ease-out';
          }
        }
        
        // 调用原始animate方法
        return originalAnimate.call(this, keyframes, options);
      };
    }
  }, 100);
};

// 应用Framer Motion补丁
patchFramerMotion();

// 渲染React应用
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);