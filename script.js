// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 50) {
        // 向下滚动
        header.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 为时间线项目添加动画
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
                }
                
                // 为技能项目添加动画
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.animation = 'scaleIn 0.6s ease-out forwards';
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    // 为所有部分添加初始样式和观察
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
    
    // 为时间线项目添加初始样式和观察
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
    
    // 为技能项目添加初始样式和观察
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });

    createBackgroundLetters();
    addScrollInteractions();
    addLetterInteractions();
    createGeometricDecorations();
    initializeTimeline();
    initializeSkills();
    initializeContactInfo();
    initializeDecorations();
    
    // 初始检查可见元素
    handleScroll();
    
    // 监听滚动事件
    window.addEventListener('scroll', handleScroll);

    initOrbInteraction();
});

// 添加鼠标移动视差效果
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('#hero');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    hero.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
});

// 创建随机背景字母
function createBackgroundLetters() {
    const heroSection = document.getElementById('hero');
    const numLetters = 41;
    const numGreenLetters = 12;
    const letters = 'LluoYyaAnNRUiI';
    const heroRect = heroSection.getBoundingClientRect();
    
    // 创建下拉提示
    const scrollHint = document.createElement('div');
    scrollHint.className = 'scroll-hint';
    scrollHint.innerHTML = `
        <div class="scroll-hint-text">向下滚动</div>
        <div class="scroll-hint-arrow"></div>
    `;
    heroSection.appendChild(scrollHint);
    
    // 创建字母
    for (let i = 0; i < numLetters; i++) {
        const letter = document.createElement('div');
        letter.className = 'background-letter';
        if (i < numGreenLetters) {
            letter.classList.add('green');
        }
        letter.textContent = letters[Math.floor(Math.random() * letters.length)];
        
        // 随机位置
        const x = Math.random() * (heroRect.width - 100);
        const y = Math.random() * (heroRect.height - 100);
        
        // 随机大小
        const size = Math.random() * 9 + 2;
        
        // 随机方向（0-360度）
        const rotation = Math.random() * 360;
        
        // 设置样式
        letter.style.left = `${x}px`;
        letter.style.top = `${y}px`;
        letter.style.fontSize = `${size}rem`;
        letter.style.transform = `rotate(${rotation}deg)`;
        
        heroSection.appendChild(letter);
    }
    
    // 添加滚动事件监听
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const letters = document.querySelectorAll('.background-letter');
                const scrollPercent = Math.min(lastScrollY / (window.innerHeight * 0.5), 1);
                
                letters.forEach((letter, index) => {
                    // 根据滚动位置计算偏移
                    const baseOffset = 50;
                    const randomOffset = Math.random() * 100 - 50;
                    const offsetX = (baseOffset + randomOffset) * scrollPercent;
                    const offsetY = (baseOffset + randomOffset) * scrollPercent;
                    
                    // 计算缩放
                    const scale = 1 + scrollPercent * 0.5;
                    
                    // 计算透明度
                    const opacity = 0.1 + scrollPercent * 0.4;
                    
                    // 获取当前旋转角度
                    const currentRotation = letter.style.transform.match(/rotate\((\d+)deg\)/);
                    const rotation = currentRotation ? currentRotation[1] : 0;
                    
                    // 应用变换
                    letter.style.transform = `
                        translate(${offsetX}px, ${offsetY}px)
                        rotate(${rotation}deg)
                        scale(${scale})
                    `;
                    letter.style.opacity = opacity;
                    
                    // 更新颜色
                    if (index < numGreenLetters) {
                        letter.style.color = `rgba(137, 245, 180, ${0.2 + scrollPercent * 0.3})`;
                    } else {
                        letter.style.color = `rgba(51, 51, 51, ${0.1 + scrollPercent * 0.2})`;
                    }
                });
                
                // 更新下拉提示的透明度
                const scrollHint = document.querySelector('.scroll-hint');
                if (scrollHint) {
                    scrollHint.style.opacity = 1 - scrollPercent;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// 添加鼠标移动事件监听
function addLetterInteractions() {
    const letters = document.querySelectorAll('.background-letter');
    const heroSection = document.getElementById('hero');
    let mouseX = 0;
    let mouseY = 0;
    
    heroSection.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        letters.forEach(letter => {
            const rect = letter.getBoundingClientRect();
            const letterX = rect.left + rect.width / 2;
            const letterY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - letterX, 2) + 
                Math.pow(mouseY - letterY, 2)
            );
            
            if (distance < 200) {
                const scale = 1 + (1 - distance / 200) * 0.2;
                const opacity = 1 - (distance / 200) * 0.5;
                const color = letter.classList.contains('green') ? 
                    'rgba(137, 245, 180, 0.8)' : 
                    'rgba(51, 51, 51, 0.8)';
                
                letter.style.transform = `scale(${scale})`;
                letter.style.opacity = opacity;
                letter.style.color = color;
            } else {
                letter.style.transform = 'scale(1)';
                letter.style.opacity = '1';
                letter.style.color = letter.classList.contains('green') ? 
                    'rgba(137, 245, 180, 0.2)' : 
                    'rgba(51, 51, 51, 0.1)';
            }
        });
    });
    
    heroSection.addEventListener('mouseleave', () => {
        letters.forEach(letter => {
            letter.style.transform = 'scale(1)';
            letter.style.opacity = '1';
            letter.style.color = letter.classList.contains('green') ? 
                'rgba(137, 245, 180, 0.2)' : 
                'rgba(51, 51, 51, 0.1)';
        });
    });
}

// 创建几何图形装饰
function createGeometricDecorations() {
    const sections = ['education', 'activities', 'contact'];
    const shapes = ['circle', 'rectangle', 'triangle', 'line'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const sectionRect = section.getBoundingClientRect();
        const numDecorations = Math.floor(Math.random() * 10) + 15; // 15-25个装饰
        
        for (let i = 0; i < numDecorations; i++) {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const decoration = document.createElement('div');
            decoration.className = `geometric-decoration ${shape}`;
            
            // 随机位置
            const x = Math.random() * sectionRect.width;
            const y = Math.random() * sectionRect.height;
            
            // 随机大小
            const size = Math.random() * 100 + 10; // 10-110px
            
            // 设置样式
            decoration.style.left = `${x}px`;
            decoration.style.top = `${y}px`;
            
            if (shape === 'circle' || shape === 'rectangle') {
                decoration.style.width = `${size}px`;
                decoration.style.height = `${size}px`;
            } else if (shape === 'line') {
                decoration.style.width = `${size}px`;
                decoration.style.height = '2px';
                decoration.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
            
            // 随机动画
            const duration = Math.random() * 10 + 10; // 10-20秒
            const delay = Math.random() * 5; // 0-5秒延迟
            decoration.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            section.appendChild(decoration);
        }
    });
}

// 添加浮动动画
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes float {
    0%, 100% {
        transform: translate(0, 0) rotate(0deg);
    }
    25% {
        transform: translate(10px, -10px) rotate(5deg);
    }
    50% {
        transform: translate(-5px, 5px) rotate(-5deg);
    }
    75% {
        transform: translate(-10px, -5px) rotate(3deg);
    }
}
`;
document.head.appendChild(styleSheet);

// 添加滚动动画
function handleScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillItems = document.querySelectorAll('.skill-item');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('visible');
        }
    });
    
    skillItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('visible');
        }
    });
}

// 添加光球交互效果
function initOrbInteraction() {
    const experienceSection = document.getElementById('experience');
    const orbs = experienceSection.querySelectorAll('.blur-orb');
    const smallOrb = experienceSection.querySelector('.small-orb');
    
    experienceSection.addEventListener('mousemove', (e) => {
        const rect = experienceSection.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // 小光球的交互
        if (smallOrb) {
            const smallOrbRect = smallOrb.getBoundingClientRect();
            const smallOrbCenterX = smallOrbRect.left + smallOrbRect.width / 2 - rect.left;
            const smallOrbCenterY = smallOrbRect.top + smallOrbRect.height / 2 - rect.top;
            
            const deltaX = mouseX - smallOrbCenterX;
            const deltaY = mouseY - smallOrbCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            const maxDistance = 300;
            const moveRatio = Math.max(0, 1 - distance / maxDistance);
            
            const moveX = deltaX * moveRatio * -0.3; // 反向移动
            const moveY = deltaY * moveRatio * -0.3;
            
            smallOrb.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            smallOrb.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + moveRatio * 0.2})`;
            smallOrb.style.filter = `blur(${20 + moveRatio * 10}px)`;
            smallOrb.style.background = `rgba(137, 245, 180, ${0.2 + moveRatio * 0.1})`;
        }
        
        // 原有的大光球交互代码
        orbs.forEach((orb, index) => {
            const orbRect = orb.getBoundingClientRect();
            const orbCenterX = orbRect.left + orbRect.width / 2 - rect.left;
            const orbCenterY = orbRect.top + orbRect.height / 2 - rect.top;
            
            // 计算光标和光球中心的距离
            const deltaX = mouseX - orbCenterX;
            const deltaY = mouseY - orbCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // 增加影响范围和移动强度
            const maxDistance = 1000; // 增加影响范围
            const moveRatio = Math.max(0, 1 - distance / maxDistance);
            
            // 为每个光球设置不同的移动速度和方向
            let moveSpeed;
            switch(index) {
                case 0: // 第一个光球移动最快
                    moveSpeed = 0.8;
                    break;
                case 1: // 第二个光球移动较慢
                    moveSpeed = 0.5;
                    break;
                case 2: // 第三个光球移动适中
                    moveSpeed = 0.65;
                    break;
                default:
                    moveSpeed = 0.6;
            }
            
            // 计算移动方向和距离，大幅增加移动幅度
            const moveX = deltaX * moveRatio * moveSpeed * (index % 2 === 0 ? 2 : -1.5);
            const moveY = deltaY * moveRatio * moveSpeed * (index % 2 === 0 ? -1.5 : 2);
            
            // 增强缩放和旋转效果
            const scale = 1 + moveRatio * 0.25; // 增加缩放幅度
            const rotate = moveRatio * (index % 2 === 0 ? 8 : -8); // 增加旋转角度
            
            // 添加扭曲效果
            const skewX = moveRatio * (index % 2 === 0 ? 5 : -5);
            const skewY = moveRatio * (index % 2 === 0 ? -5 : 5);
            
            // 减少过渡时间，使移动更加即时
            orb.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
            orb.style.transform = `
                translate(${moveX}px, ${moveY}px) 
                scale(${scale}) 
                rotate(${rotate}deg)
                skew(${skewX}deg, ${skewY}deg)
            `;
            
            // 动态调整模糊效果
            const blur = 80 + moveRatio * 30;
            orb.style.filter = `blur(${blur}px)`;
            
            // 动态调整不透明度
            const opacity = 0.15 + moveRatio * 0.15;
            orb.style.background = `rgba(137, 245, 180, ${opacity})`;
        });
    });
    
    // 鼠标离开时重置所有光球
    experienceSection.addEventListener('mouseleave', () => {
        if (smallOrb) {
            smallOrb.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            smallOrb.style.transform = 'translate(0, 0) scale(1)';
            smallOrb.style.filter = 'blur(20px)';
            smallOrb.style.background = 'rgba(137, 245, 180, 0.2)';
        }
        
        orbs.forEach(orb => {
            orb.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            orb.style.transform = 'translate(0, 0) scale(1) rotate(0deg) skew(0deg, 0deg)';
            orb.style.filter = 'blur(80px)';
            orb.style.background = 'rgba(137, 245, 180, 0.15)';
        });
    });
}

function addScrollInteractions() {
    const heroSection = document.getElementById('hero');
    const letters = document.querySelectorAll('.background-letter');
    const scrollHint = document.querySelector('.scroll-hint');
    
    let isScrolling = false;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
        
        requestAnimationFrame(() => {
            if (isScrolling) {
                const scrollPosition = window.scrollY;
                const heroHeight = heroSection.offsetHeight;
                const scrollPercent = Math.min(scrollPosition / heroHeight, 1);
                
                // 更新字母透明度
                letters.forEach(letter => {
                    const opacity = 1 - scrollPercent;
                    letter.style.opacity = opacity;
                });
                
                // 更新提示透明度
                if (scrollHint) {
                    scrollHint.style.opacity = 1 - scrollPercent;
                }
            }
        });
    });
}

function initializeTimeline() {
    // Implementation of initializeTimeline function
}

function initializeSkills() {
    // Implementation of initializeSkills function
}

function initializeContactInfo() {
    // Implementation of initializeContactInfo function
}

function initializeDecorations() {
    // Implementation of initializeDecorations function
} 