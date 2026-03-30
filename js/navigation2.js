// 드롭다운 네비게이션 제어
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const mainMenuItems = document.querySelectorAll('.main-menu > li');
    
    let currentOpenMenu = null;
    let closeTimer = null;

    // 각 메인 메뉴 아이템에 이벤트 리스너 추가
    mainMenuItems.forEach(item => {
        const button = item.querySelector('.btn-menu');
        const subMenu = item.querySelector('.sub-menu');

        // 마우스 오버 시 메뉴 열기
        item.addEventListener('mouseenter', function() {
            // 닫기 타이머가 있으면 취소
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }

            // 다른 메뉴가 열려있으면 닫기
            if (currentOpenMenu && currentOpenMenu !== item) {
                currentOpenMenu.classList.remove('active');
            }

            // 현재 메뉴 열기
            item.classList.add('active');
            header.classList.add('header-open');
            currentOpenMenu = item;
        });

        // 마우스 아웃 시 메뉴 닫기 (딜레이 추가)
        item.addEventListener('mouseleave', function() {
            closeTimer = setTimeout(() => {
                item.classList.remove('active');
                
                // 모든 메뉴가 닫혔는지 확인
                const hasActiveMenu = Array.from(mainMenuItems).some(mi => 
                    mi.classList.contains('active')
                );
                
                if (!hasActiveMenu) {
                    header.classList.remove('header-open');
                    currentOpenMenu = null;
                }
            }, 200); // 200ms 딜레이로 부드러운 전환
        });
    });

    // 스크롤 시 헤더 스타일 변경
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
});
