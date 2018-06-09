$(function(){

    var excitation_current, torque, voltage, resistance = 0;

    // реулятор для вольтметра
    $('#v-control').knobKnob({
        snap : 1,
        value: 1,
        turn : function (ratio) {
         var deg = ratio * 90;
         $('#v-spear').css('transform', 'rotate(' + (deg - 45) + 'deg)'); // поворачивает стрелку вольтметра

         voltage = (ratio * 250).toFixed(1); // устанавливает значение напряжения
         if (voltage == 0)
           voltage = 0.1;
           counting();
         }
    });


    // реулятор для добавочного сопротивления
    var counter = 0, last_resistance = 1;
    $('#res-control').knobKnob({
      snap : 10,
      value: 0,
      turn :  function (ratio) {
          if ((counter % 2) != 0) {
            resistance = (ratio * 3 + 1).toFixed(0);
            counting();
          } else {
            last_resistance = (ratio * 3 + 1).toFixed(0);
          }
        }
    });
    $('.switch').on('click', function(){
      if ($('#switch1').prop('checked')) {
        if ((counter % 2) != 0) { // mode off
          last_resistance = resistance;
          resistance = 0;
          counting();
        } else {                  // mode on
          resistance = last_resistance;
          counting();
        }
        counter++;
      }
    });


    // реулятор для амперметра
    $('#a-control').knobKnob({
        snap : 1,
        value: 1,
        turn : function (ratio) {
         var deg = ratio * 90;
         $('#a-spear').css('transform', 'rotate(' + (deg - 45) + 'deg)'); // поворачивает стрелку амперметра

         excitation_current = (ratio * 5).toFixed(1); // устанавливает значение тока возбуждения
         if (excitation_current == 0)
           excitation_current = 0.1;
           counting();
         }
    });


    // регулятор момента сопротивления
    $('#tor-control').knobKnob({
        snap : 1,
        value: 89.5,
        turn : function (ratio) {
          torque = (ratio * 40 - 20).toFixed(1);
          new JSGadget.Display("#tor-display", {
            digits: 4,
            color: "white",
            shadow: {color: "gray"}},
            torque);
            counting();
        }
    });


    function counting(){

      excitation_flux = excitation_current * 2;

      var armature = torque / excitation_flux;
      new JSGadget.Display("#arm-display", {
        digits: 4,
        color: "white",
        shadow: {color: "gray"}},
        armature.toFixed(1));
      var angular = voltage / excitation_flux - (resistance + 2) / (excitation_flux * excitation_flux) * torque;
      if ((angular < -99.99) || (angular > 999.99)) {
        new JSGadget.Display("#ang-display", {
          digits: 5,
          color: "white",
          shadow: {color: "gray"}},
          angular.toFixed(1));
      } else {
        new JSGadget.Display("#ang-display", {
          digits: 4,
          color: "white",
          shadow: {color: "gray"}},
          angular.toFixed(1));
      }
    }

    // power button
    var counter2 = 0;
    $('.button').on('click', function(){
      if ((counter2 % 2) == 0) {
        $('#off-on').css('display', 'none');
      } else {
        $('#off-on').css('display', 'inline');
      }
      counter2++;
    });
});
