(() => {
  const videoId = "zBy4qMsh5wI";
  const header = document.querySelector("body > header");

  if (!header) {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.className = "banner-video";
  iframe.title = "Decorative background video";
  iframe.tabIndex = -1;
  iframe.setAttribute("aria-hidden", "true");
  iframe.setAttribute("allow", "autoplay; encrypted-media");
  iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&playsinline=1&rel=0`;
  header.prepend(iframe);

  const resizeVideo = () => {
    const { width, height } = header.getBoundingClientRect();
    const aspectRatio = 16 / 9;
    const videoWidth = Math.max(width, height * aspectRatio);
    const videoHeight = Math.max(height, width / aspectRatio);
    iframe.style.width = `${videoWidth}px`;
    iframe.style.height = `${videoHeight}px`;
  };

  resizeVideo();

  if ("ResizeObserver" in window) {
    new ResizeObserver(resizeVideo).observe(header);
  } else {
    window.addEventListener("resize", resizeVideo, { passive: true });
  }
})();
