/**
 * navigation.js
 * 성남비즈플라자 - 헤더 네비게이션
 */

(function () {
    'use strict';

    const header = document.querySelector('.site-header');
    const navWrap = document.querySelector('.nav-wrap');
    const mainMenuItems = document.querySelectorAll('.main-menu > li');
    const hamburger = document.querySelector('.nav-hamburger');

    if (!header || !navWrap) return;

    /* ──────────────────────────────────────────
       유틸
    ────────────────────────────────────────── */

    function isMobile() {
        return window.innerWidth <= 768;
    }

    /* ──────────────────────────────────────────
       데스크탑 - 메뉴 hover (마우스)
    ────────────────────────────────────────── */

    function initDesktopMenu() {
        mainMenuItems.forEach(function (item) {
            item.addEventListener('mouseenter', function () {
                if (isMobile()) return;
                closeAllMenus();
                openMenuItem(item);
            });

            item.addEventListener('mouseleave', function () {
                if (isMobile()) return;
                closeMenuItem(item);
                // 모든 서브메뉴가 닫히면 header-open 해제
                if (!document.querySelector('.main-menu > li.active')) {
                    header.classList.remove('header-open');
                }
            });
        });

        navWrap.addEventListener('mouseleave', function () {
            if (isMobile()) return;
            closeAllMenus();
            header.classList.remove('header-open');
        });
    }

    /* ──────────────────────────────────────────
       모바일 - 햄버거 토글
    ────────────────────────────────────────── */

    function initHamburger() {
        if (!hamburger) return;

        hamburger.addEventListener('click', function () {
            const isOpen = header.classList.contains('header-open');
            if (isOpen) {
                closeAllMenus();
                header.classList.remove('header-open');
                hamburger.setAttribute('aria-label', '메뉴 열기');
            } else {
                header.classList.add('header-open');
                hamburger.setAttribute('aria-label', '메뉴 닫기');
            }
        });
    }

    /* ──────────────────────────────────────────
       모바일 - 메인 메뉴 버튼 클릭 (서브메뉴 아코디언)
    ────────────────────────────────────────── */

    function initMobileMenu() {
        mainMenuItems.forEach(function (item) {
            const btn = item.querySelector('.btn-menu');
            if (!btn) return;

            btn.addEventListener('click', function () {
                if (!isMobile()) return;

                const isActive = item.classList.contains('active');

                // 다른 메뉴 닫기
                mainMenuItems.forEach(function (other) {
                    if (other !== item) closeMenuItem(other);
                });

                // 현재 메뉴 토글
                if (isActive) {
                    closeMenuItem(item);
                } else {
                    openMenuItem(item);
                }
            });
        });
    }

    /* ──────────────────────────────────────────
       외부 클릭 시 닫기
    ────────────────────────────────────────── */

    function initOutsideClick() {
        document.addEventListener('click', function (e) {
            if (!header.contains(e.target)) {
                closeAllMenus();
                header.classList.remove('header-open');
                if (hamburger) hamburger.setAttribute('aria-label', '메뉴 열기');
            }
        });
    }

    /* ──────────────────────────────────────────
       ESC 키로 닫기
    ────────────────────────────────────────── */

    function initKeyboard() {
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeAllMenus();
                header.classList.remove('header-open');
                if (hamburger) hamburger.setAttribute('aria-label', '메뉴 열기');
            }
        });
    }

    /* ──────────────────────────────────────────
       리사이즈 - 모바일 ↔ 데스크탑 전환 시 초기화
    ────────────────────────────────────────── */

    function initResize() {
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                closeAllMenus();
                header.classList.remove('header-open');
                if (hamburger) hamburger.setAttribute('aria-label', '메뉴 열기');
            }, 200);
        });
    }

    /* ──────────────────────────────────────────
       헬퍼
    ────────────────────────────────────────── */

    function openMenuItem(item) {
        item.classList.add('active');
        header.classList.add('header-open');
    }

    function closeMenuItem(item) {
        item.classList.remove('active');
    }

    function closeAllMenus() {
        mainMenuItems.forEach(function (item) {
            closeMenuItem(item);
        });
    }

    /* ──────────────────────────────────────────
       초기화
    ────────────────────────────────────────── */

    initDesktopMenu();
    initHamburger();
    initMobileMenu();
    initOutsideClick();
    initKeyboard();
    initResize();

})();
