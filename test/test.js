module('jquery.inview', {
  setup: function() {
    $(window).scrollTop(0).scrollLeft(0);
    
    this.size    = 20000;
    this.element = $('<div>', { html: "testing ..." }).css({
      width:    '50px',
      height:   '50px',
      position: 'absolute'
    });
  },
  
  teardown: function() {
    $(window).scrollTop(0).scrollLeft(0);
    
    this.element.remove();
  }
});


test('Check vertical scrolling', function() {
  stop(10000);
  expect(5);
  
  var element = this.element,
      firstCall,
      secondCall,
      thirdCall,
      inView;
  
  element.css({ left: 0, top: this.size - 50 + 'px' });
  element.appendTo('body');
  element.bind('inview.firstCall', function() { firstCall = true; });
  
  setTimeout(function() {
    $(window).scrollTop(0).scrollLeft(0);
    
    ok(!firstCall, 'inview shouldn\'t be triggered initially when the element isn\'t in the viewport');
    element.unbind('inview.firstCall');
    element.bind('inview.secondCall', function(event, inViewParam) {
      secondCall = true;
      inView = inViewParam;
    });
    
    $(window).scrollTop(9999999);
    
    setTimeout(function() {
      
      ok(secondCall, 'Triggered handler after element appeared in viewport');
      ok(inView, 'Parameter, indicating whether the element is in the viewport, is set to "true"');
      element.unbind('inview.secondCall');
      element.bind('inview.thirdCall', function(event, inViewParam) {
        thirdCall = true;
        inView = inViewParam;
      });
      
      $(window).scrollTop(0).scrollLeft(0);
      
      setTimeout(function() {
        ok(thirdCall, 'Triggered handler after element disappeared in viewport');
        strictEqual(inView, false, 'Parameter, indicating whether the element is in the viewport, is set to "false"');
        start();
      }, 1000);
      
    }, 1000);
    
  }, 1000);
});


test('Check horizontal scrolling', function() {
  stop(10000);
  expect(5);
  
  var element = this.element,
      firstCall,
      secondCall,
      thirdCall,
      inView;
  
  element.css({ top: 0, left: this.size - 50 + 'px' });
  element.appendTo('body');
  element.bind('inview.firstCall', function() { firstCall = true; });
  
  setTimeout(function() {
    $(window).scrollTop(0).scrollLeft(0);
    
    ok(!firstCall, 'inview shouldn\'t be triggered initially when the element isn\'t in the viewport');
    element.unbind('inview.firstCall');
    element.bind('inview.secondCall', function(event, inViewParam) {
      secondCall = true;
      inView = inViewParam;
    });
    
    $(window).scrollLeft(9999999);
    
    setTimeout(function() {
      
      ok(secondCall, 'Triggered handler after element appeared in viewport');
      ok(inView, 'Parameter, indicating whether the element is in the viewport, is set to "true"');
      element.unbind('inview.secondCall');
      element.bind('inview.thirdCall', function(event, inViewParam) {
        thirdCall = true;
        inView = inViewParam;
      });
      
      $(window).scrollTop(0).scrollLeft(0);
      
      setTimeout(function() {
        ok(thirdCall, 'Triggered handler after element disappeared in viewport');
        strictEqual(inView, false, 'Parameter, indicating whether the element is in the viewport, is set to "false"');
        start();
      }, 1000);
      
    }, 1000);
    
  }, 1000);
});