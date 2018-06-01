$(function(){

    $('#control').knobKnob({
        snap : 10,
        value: 65,
        turn : function (ratio) {
         var deg = ratio * 90;
         $('#v-spear').css('transform', 'rotate(' + (deg - 45) + 'deg)')
         }
    });
    if (1) {
      $('#control2').knobKnob({
          snap : 10,
          value: 60,
      });
    }
    $('#control3').knobKnob({
        snap : 10,
        value: 65,
        turn : function (ratio) {
         var deg = ratio * 90;
         $('#a-spear').css('transform', 'rotate(' + (deg - 45) + 'deg)')
         }
    });
    $('#control4').knobKnob({
        snap : 10,
        value: 65,
        turn : function (ratio) {
          var torque = ratio * 20;
          var display;
          display = new JSGadget.Display(".clock", {
            digits: 3,
            color: "white",
            shadow: {color: "gray"}},
            torque.toFixed(1));
        }
    });
});
