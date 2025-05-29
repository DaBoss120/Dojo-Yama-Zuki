document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeButton = document.querySelector('.modal .close-button');
    const galleryContainer = document.querySelector('.all-photos');

    let originalThumb = null;
    let finalModalRect = null; // Stores L,T,W,H for the image at scale(1)
    let isModalOpening = false;
    let isDragging = false;
    let startX, startY, currentX, currentY;
    let dragThreshold = 50;

    // --- Open Modal Function ---
    function openModal(imgElement) {
        if (isModalOpening || modal.classList.contains('open')) return;
        isModalOpening = true;

        originalThumb = imgElement;
        const thumbRect = originalThumb.getBoundingClientRect();

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Initial setup for modalImg BEFORE setting src
        modalImg.style.transition = 'none';
        modalImg.style.position = 'fixed';
        modalImg.style.opacity = '0'; // Start transparent
        modalImg.style.transformOrigin = 'center center';
        modalImg.style.objectFit = 'contain'; // Final object-fit for enlarged image

        const onImageLoad = () => {
            modalImg.onload = null;
            modalImg.onerror = null;

            const naturalWidth = modalImg.naturalWidth;
            const naturalHeight = modalImg.naturalHeight;

            if (naturalWidth === 0 || naturalHeight === 0) {
                console.warn("Modal image natural dimensions are zero. Closing modal.");
                closeModal(false);
                isModalOpening = false;
                return;
            }
            
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const computedStyle = window.getComputedStyle(modalImg);
            let cssMaxWidth = parseFloat(computedStyle.maxWidth) || (viewportWidth * 0.9);
            let cssMaxHeight = parseFloat(computedStyle.maxHeight) || (viewportHeight * 0.9);
            if (isNaN(cssMaxWidth) || cssMaxWidth <= 0) cssMaxWidth = viewportWidth * 0.9;
            if (isNaN(cssMaxHeight) || cssMaxHeight <= 0) cssMaxHeight = viewportHeight * 0.9;

            let targetWidth = naturalWidth;
            let targetHeight = naturalHeight;
            const aspectRatio = naturalWidth / naturalHeight;

            if (targetWidth / targetHeight > cssMaxWidth / cssMaxHeight) {
                if (targetWidth > cssMaxWidth) {
                    targetWidth = cssMaxWidth;
                    targetHeight = targetWidth / aspectRatio;
                }
            } else {
                if (targetHeight > cssMaxHeight) {
                    targetHeight = cssMaxHeight;
                    targetWidth = targetHeight * aspectRatio;
                }
            }
            if (targetWidth > cssMaxWidth) { targetWidth = cssMaxWidth; targetHeight = targetWidth / aspectRatio; }
            if (targetHeight > cssMaxHeight) { targetHeight = cssMaxHeight; targetWidth = targetHeight * aspectRatio; }

            const finalLeft = (viewportWidth - targetWidth) / 2;
            const finalTop = (viewportHeight - targetHeight) / 2;
            finalModalRect = { left: finalLeft, top: finalTop, width: targetWidth, height: targetHeight };

            // ** Setup for integrated growth and bounce animation **
            // 1. Set modalImg to its final W/H dimensions.
            modalImg.style.width = `${finalModalRect.width}px`;
            modalImg.style.height = `${finalModalRect.height}px`;
            
            // 2. Calculate initial scale to make the (now final-dimensioned) modalImg
            //    appear as small as the thumbnail.
            const initialScaleX = thumbRect.width / finalModalRect.width;
            const initialScaleY = thumbRect.height / finalModalRect.height;
            const initialScale = Math.min(initialScaleX, initialScaleY); 
            
            // 3. Position the (final-dimensioned) modalImg so its CENTER aligns 
            //    with the thumbnail's CENTER. This is the top-left for the unscaled element.
            const initialLeft = thumbRect.left + (thumbRect.width - finalModalRect.width) / 2;
            const initialTop = thumbRect.top + (thumbRect.height - finalModalRect.height) / 2;

            modalImg.style.left = `${initialLeft}px`;
            modalImg.style.top = `${initialTop}px`;
            
            // 4. Apply the initial scale. Since transform-origin is center,
            //    it scales around the now-aligned center, making it visually match the thumbnail.
            modalImg.style.transform = `scale(${initialScale})`;
            modalImg.style.opacity = '0'; // Start transparent, will fade in

            modalImg.offsetHeight; // Force reflow

            const animationDuration = '0.55s';
            const modalFadeDuration = animationDuration;

            modal.style.backgroundColor = 'rgba(0,0,0,0)';
            requestAnimationFrame(() => {
                modal.style.transition = `background-color ${modalFadeDuration} ease-in-out`;
                modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            });

            // Single animation step for all properties:
            modalImg.style.transition = `
                left ${animationDuration} cubic-bezier(0.25, 0.1, 0.25, 1), 
                top ${animationDuration} cubic-bezier(0.25, 0.1, 0.25, 1), 
                transform ${animationDuration} cubic-bezier(0.34, 1.56, 0.64, 1), 
                opacity ${parseFloat(animationDuration) * 0.6}s ease-in-out 0.05s`;

            // Target styles for the animation:
            modalImg.style.left = `${finalModalRect.left}px`; // Target center position
            modalImg.style.top = `${finalModalRect.top}px`;   // Target center position
            modalImg.style.transform = 'scale(1)'; 
            modalImg.style.opacity = '1';

            setTimeout(() => {
                if (isModalOpening || modal.classList.contains('open') || modal.style.display === 'flex') {
                     modalImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                }
                modal.classList.add('open');
                isModalOpening = false;
            }, parseFloat(animationDuration) * 1000);
        };

        modalImg.onerror = () => {
            modalImg.onload = null; modalImg.onerror = null;
            console.error("Modal image failed to load:", modalImg.src);
            closeModal(false); isModalOpening = false;
        };
        modalImg.onload = onImageLoad;
        modalImg.src = originalThumb.src;
        if (modalImg.complete && modalImg.naturalWidth > 0) {
            onImageLoad();
        }
    }

    // --- Close Modal Function ---
    function closeModal(animateBackToThumb = true) {
        if (modal.style.display === 'none') return;
        const wasOpening = isModalOpening;
        isModalOpening = false;
        
        if (wasOpening && !modal.classList.contains('open')) {
            modal.style.transition = 'opacity 0.1s linear, background-color 0.1s linear';
            modal.style.opacity = '0'; modal.style.backgroundColor = 'rgba(0,0,0,0)';
            modalImg.style.transition = 'opacity 0.1s linear'; modalImg.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none'; document.body.style.overflow = '';
                Object.assign(modalImg.style, { position: 'fixed', left: '', top: '', width: '', height: '', transform: '', transition: '', objectFit: 'contain', opacity: '0'});
                Object.assign(modal.style, { opacity: '1', transition: '' });
                originalThumb = null; finalModalRect = null;
            }, 100);
            return;
        }

        modal.classList.remove('open');
        document.body.style.overflow = '';
        modal.style.transition = 'background-color 0.3s ease-in-out';
        modal.style.backgroundColor = 'rgba(0,0,0,0)';

        if (animateBackToThumb && originalThumb && finalModalRect) {
            const thumbRect = originalThumb.getBoundingClientRect();
            
            modalImg.style.transition = `
                left 0.3s ease-in-out, 
                top 0.3s ease-in-out, 
                transform 0.3s ease-in-out, 
                opacity 0.25s ease-in-out`;

            const targetScaleX = thumbRect.width / finalModalRect.width;
            const targetScaleY = thumbRect.height / finalModalRect.height;
            const targetScale = Math.min(targetScaleX, targetScaleY);

            // Target L/T for the modalImg (which is finalModalRect W/H) to align its center with thumb's center
            const targetAnimLeft = thumbRect.left + (thumbRect.width - finalModalRect.width) / 2;
            const targetAnimTop = thumbRect.top + (thumbRect.height - finalModalRect.height) / 2;

            modalImg.style.left = `${targetAnimLeft}px`;
            modalImg.style.top = `${targetAnimTop}px`;
            modalImg.style.transform = `scale(${targetScale})`;
            modalImg.style.opacity = '0';
            // modalImg.style.objectFit = 'cover'; // Optional: if thumbnail was 'cover'
        } else {
            modalImg.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
            modalImg.style.opacity = '0';
            modalImg.style.transform = 'scale(0.8)';
        }

        setTimeout(() => {
            modal.style.display = 'none';
            Object.assign(modalImg.style, { opacity: '0', position: 'fixed', left: '', top: '', width: '', height: '', transform: '', transition: '', objectFit: 'contain' });
            modal.style.transition = '';
            originalThumb = null; finalModalRect = null;
        }, 300);
    }

    // --- Event Listeners ---
    if (galleryContainer) galleryContainer.addEventListener('click', (e) => { if (e.target.tagName === 'IMG') openModal(e.target); });
    if (closeButton) closeButton.addEventListener('click', () => closeModal());
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal && modal.classList.contains('open')) closeModal(); });
    modalImg.addEventListener('click', (e) => e.stopPropagation());

    // --- Swipe Down to Close Functionality ---
    function handleGestureStart(e) {
        if (e.target !== modalImg || !modal.classList.contains('open') || isModalOpening) return;
        isDragging = true;
        
        Object.assign(modalImg.style, {
            transition: 'none',
            transform: 'scale(1) translate(0px, 0px)' 
        });
        modalImg.classList.add('swiping');

        startX = e.pageX || e.touches[0].pageX;
        startY = e.pageY || e.touches[0].pageY;
        e.preventDefault();
    }

    function handleGestureMove(e) {
        if (!isDragging) return;
        currentX = e.pageX || e.touches[0].pageX;
        currentY = e.pageY || e.touches[0].pageY;
        const diffX = currentX - startX;
        let diffY = currentY - startY;
        if (diffY < 0) diffY *= 0.3;
        
        modalImg.style.transform = `scale(1) translate(${diffX}px, ${diffY}px)`;
        e.preventDefault();
    }

    function handleGestureEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        modalImg.classList.remove('swiping');
        modalImg.style.transition = 'transform 0.3s cubic-bezier(0.25,0.8,0.25,1), opacity 0.3s ease';

        const diffY = currentY - startY;

        if (diffY > dragThreshold) {
            const opacity = Math.max(0, 1 - (diffY / (window.innerHeight / 2)));
            modalImg.style.opacity = opacity.toString();
            closeModal(true); 
        } else {
            modalImg.style.transform = 'scale(1) translate(0px, 0px)';
            modalImg.style.opacity = '1';
            setTimeout(() => {
                if (modal.classList.contains('open')) {
                    modalImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                }
            }, 300);
        }
    }
     if (modalImg) {
        modalImg.addEventListener('mousedown', handleGestureStart);
        modalImg.addEventListener('touchstart', handleGestureStart, { passive: false });
        document.addEventListener('mousemove', handleGestureMove);
        document.addEventListener('touchmove', handleGestureMove, { passive: false });
        document.addEventListener('mouseup', handleGestureEnd);
        document.addEventListener('touchend', handleGestureEnd);
    }
    
    const observer = new MutationObserver((mutationsList, observer) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // console.log('Gallery content changed, listeners are attached via delegation.');
            }
        }
    });

    if (galleryContainer) {
        observer.observe(galleryContainer, { childList: true, subtree: false });
    }
});