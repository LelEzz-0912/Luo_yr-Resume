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
    addLetterInteractions();
    createBackgroundDecorations();
    
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
    const container = document.querySelector('.background-letters');
    const letters = 'LuoYuanRui';
    const numLetters = 41; // 增加到41个字母（原来35个+6个）
    const numGreenLetters = 12; // 增加到12个浅粉绿色字母（原来8个+4个）

    // 创建所有字母
    for (let i = 0; i < numLetters; i++) {
        const letter = document.createElement('div');
        letter.className = 'background-letter';
        
        // 随机选择一个字母
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        letter.textContent = randomLetter;
        
        // 判断是否是大写字母
        if (['L', 'Y', 'R'].includes(randomLetter)) {
            letter.classList.add('capital');
        } else {
            letter.classList.add('regular');
        }
        
        // 优化随机位置分布，避免字母过于集中
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // 确保字母不会太靠近边缘
        letter.style.left = `${Math.max(5, Math.min(95, x))}%`;
        letter.style.top = `${Math.max(5, Math.min(95, y))}%`;
        
        // 随机动画延迟
        letter.style.animationDelay = `${Math.random() * 5}s`;
        
        // 随机旋转方向
        if (Math.random() > 0.5) {
            letter.style.animationDirection = 'reverse';
        }
        
        // 随机初始旋转角度
        letter.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(letter);
    }

    // 随机选择12个字母设置为浅粉绿色
    const allLetters = container.querySelectorAll('.background-letter');
    const greenIndices = new Set();
    
    while (greenIndices.size < numGreenLetters) {
        const randomIndex = Math.floor(Math.random() * allLetters.length);
        greenIndices.add(randomIndex);
    }
    
    greenIndices.forEach(index => {
        allLetters[index].style.color = 'rgba(137, 245, 180, 0.3)'; // 浅粉绿色，透明度0.3
    });
}

// 添加背景字母的鼠标交互
function addLetterInteractions() {
    const letters = document.querySelectorAll('.background-letter');
    const hero = document.querySelector('#hero');
    let mouseX = 0;
    let mouseY = 0;

    // 跟踪鼠标位置
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        letters.forEach(letter => {
            const letterRect = letter.getBoundingClientRect();
            const letterX = letterRect.left - rect.left + letterRect.width / 2;
            const letterY = letterRect.top - rect.top + letterRect.height / 2;

            // 计算字母到鼠标的距离
            const distanceX = mouseX - letterX;
            const distanceY = mouseY - letterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // 设置影响范围
            const radius = 200;
            
            if (distance < radius) {
                // 计算移动和旋转程度
                const power = (1 - distance / radius) * 30;
                const moveX = (distanceX / distance) * power;
                const moveY = (distanceY / distance) * power;
                const rotate = (distanceX / radius) * 20;
                
                // 应用变换
                letter.style.transform = `
                    translate(${moveX}px, ${moveY}px)
                    rotate(${rotate}deg)
                    scale(${1 + power/100})
                `;
                
                // 添加发光效果
                if (letter.style.color.includes('rgba(137, 245, 180')) {
                    letter.style.textShadow = `0 0 ${power}px rgba(137, 245, 180, 0.8)`;
                } else {
                    letter.style.textShadow = `0 0 ${power}px rgba(51, 51, 51, 0.3)`;
                }
            } else {
                // 重置变换
                letter.style.transform = '';
                letter.style.textShadow = '';
            }
        });
    });

    // 鼠标离开时重置所有字母
    hero.addEventListener('mouseleave', () => {
        letters.forEach(letter => {
            letter.style.transform = '';
            letter.style.textShadow = '';
        });
    });

    // 点击效果
    letters.forEach(letter => {
        letter.addEventListener('click', () => {
            // 添加弹跳动画
            letter.style.transform = 'scale(1.5) translateY(-20px)';
            letter.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            // 重置动画
            setTimeout(() => {
                letter.style.transform = 'scale(1) translateY(0)';
                setTimeout(() => {
                    letter.style.transition = '';
                }, 300);
            }, 300);
        });
    });
}

// 创建背景装饰
function createBackgroundDecorations() {
    const container = document.createElement('div');
    container.className = 'background-decorations';
    document.body.appendChild(container);

    // 创建更多的装饰元素
    const decorations = [
        { type: 'line', count: 15 },
        { type: 'circle', count: 12 },
        { type: 'triangle', count: 8 },
        { type: 'square', count: 10 },
        { type: 'dot', count: 20 },
        { type: 'plus', count: 8 }
    ];

    decorations.forEach(({ type, count }) => {
        for (let i = 0; i < count; i++) {
            const decoration = document.createElement('div');
            decoration.className = `decoration ${type}`;

            // 随机位置
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            decoration.style.left = `${x}%`;
            decoration.style.top = `${y}%`;

            // 随机大小
            const size = type === 'line' ? 
                Math.random() * 100 + 50 : // 线条长度 50-150px
                Math.random() * 20 + 10;   // 其他形状大小 10-30px
            
            if (type === 'line') {
                decoration.style.width = `${size}px`;
                // 随机旋转角度
                decoration.style.transform = `rotate(${Math.random() * 360}deg)`;
            } else {
                decoration.style.width = `${size}px`;
                decoration.style.height = `${size}px`;
            }

            // 随机动画
            const animationDuration = Math.random() * 10 + 10; // 10-20秒
            const animationDelay = Math.random() * 5; // 0-5秒延迟
            decoration.style.animation = `float ${animationDuration}s ease-in-out ${animationDelay}s infinite`;

            container.appendChild(decoration);
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