document.addEventListener('DOMContentLoaded', () => {
  const githubSkeleton = document.querySelector('#github-repos-container .project-card.skeleton');
  const blogSkeleton = document.querySelector('#blog-posts-container .post-card.skeleton');
  
  const hideSkeleton = (skeletonElement) => {
    if (skeletonElement) {
      skeletonElement.classList.add('hidden');
    }
  };
  
  Utils.Logger.log('骨架屏已初始化');
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const container = mutation.target;
        
        if (container.id === 'github-repos-container') {
          const hasContent = container.querySelector('.project-card:not(.skeleton)');
          if (hasContent && githubSkeleton) {
            hideSkeleton(githubSkeleton);
          }
        }
        
        if (container.id === 'blog-posts-container') {
          const hasContent = container.querySelector('.post-card:not(.skeleton)');
          if (hasContent && blogSkeleton) {
            hideSkeleton(blogSkeleton);
          }
        }
      }
    });
  });
  
  if (githubSkeleton) {
    observer.observe(document.getElementById('github-repos-container'), { childList: true });
  }
  
  if (blogSkeleton) {
    observer.observe(document.getElementById('blog-posts-container'), { childList: true });
  }
});