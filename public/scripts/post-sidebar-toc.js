// Utilities
/**
 * 実行を間引きする
 * @param fn 実行する関数
 * @param [interval] 実行間隔
 */
const throttle = (fn, interval = 0) => {
  let lastExecutionTime = Date.now();

  return () => {
    const now = Date.now();

    if ((lastExecutionTime + interval) < now) {
      lastExecutionTime = now;

      fn();
    }
  };
};

/**
 * スクロール時のハンドラー
 */
const handleScroll = async () => {
  const $tocLinks = Array.from($postSidebarToc.getElementsByClassName('tocLink'));
  let currentLinkIndex = -1;

  for (let i = 0; i < $tocLinks.length; i += 1) {
    const $tocLink = $tocLinks[i];
    const href = $tocLink.getAttribute('href');

    if (!href) {
      continue;
    }

    const anchor = href.replace(/^#+/, '');

    const $targetHeading = document.getElementById(anchor);
    const rect = await $targetHeading.getBoundingClientRectAsync();

    if (rect.top > 0) {
      currentLinkIndex = i;

      break;
    }
  }

  $tocLinks.forEach(($tocLink, i) => {
    console.log($tocLink);

    if (currentLinkIndex === i) {
      $tocLink.classList.add('-active');
    } else {
      // $tocLink.classList.remove('-active');
    }
  });
}

const $postSidebarToc = document.getElementById('postSidebarToc');

(async () => {
  window.addEventListener('scroll', throttle(handleScroll, 500));
  await handleScroll();
})();
