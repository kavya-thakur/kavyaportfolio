gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

pageoneanimations = gsap.timeline()
secoundpageanimation = gsap.timeline()

let mm = gsap.matchMedia();
mm.add("(max-width:500px)" ,()=> {
  //mobile
  pageoneanimations.from(".hero-heading1 h1 , .hero-heading2 h1"  , {
    y : "100%",
    duration :0.6,
    ease : Power4 ,
    stagger : 0.4
})
pageoneanimations.from(".svg",{
  opacity : 0
})
pageoneanimations.from(".img",{
  opacity : 0,
})
secoundpageanimation.from("#page2 .about , .about h3", {
  y : "100%" ,
  duration :0.6,
    ease : Power4 ,
    stagger : 0.4 ,
    scrollTrigger : {
      trigger : ".secoundsection" ,
      // scroller : ".secoundsection",
      markers: true ,
      start : "top 30%",
      end : "top 20%",
      scrub : 3 ,
  }
})
})
 mm.add("(min-width:501px)", ()=> {
  pageoneanimations.from(".hero-heading1 h1 , .hero-heading2 h1"  , {
    y : "100%",
    duration :0.6,
    ease : Power4 ,
    stagger : 0.4
})
pageoneanimations.from(".svg",{
  opacity : 0
})
pageoneanimations.from(".img",{
  opacity : 0,
})
secoundpageanimation.from("#page2 .about , .about h3", {
  y : "100%" ,
  duration :0.6,
    ease : Power4 ,
    stagger : 0.4 ,
    scrollTrigger : {
      trigger : ".secoundsection" ,
      scroller : "#main",
      markers: true ,
      start : "top 30%",
      end : "top 20%",
      scrub : 3 ,
  }
})
 })
