$( document ).ready( function () {
  $( "#resetButton" ).prop( "disabled", true );

  //reset button
  $( ".bill-input_form" ).bind( "keyup change", function ( e ) {
    if ( $( this ).val() != "" ) {
      $( "#resetButton" ).prop( "disabled", false );
    } else {
      $( "#resetButton" ).prop( "disabled", true );
    }
  } );
  $( "#resetButton" ).click( function () {
    $( "input" ).val( "" );
    $( "#tip-amount_total" ).text( "$0.00" );
    $( "#tip-amount_per-person" ).text( "$0.00" );
    $( ".tip-percent_container .btn_percent" ).removeClass( "active" );
  } );

  //error classes
  function inputred() {
    if ( $( "input" ).val() == "" || 0 ) {
      $( ".people-amount_error" ).show();
      $( ".bill_input" ).addClass( "error" );
      $( ".people-amount_input" ).addClass( "error" );
    } else {
      $( ".people-amount_error" ).hide();
      $( ".bill_input" ).removeClass( "error" );
      $( ".people-amount_input" ).removeClass( "error" );
    }
  }

  var tip = 0;
  var custom = 0;
  //taking buttons value
  $( ".tip-percent_container" )
    .find( ".btn_percent" )
    .click( function () {
      $( ".tip-percent_container .btn_percent" ).removeClass( "active" );
      $( this ).addClass( "active" );

      inputred();

      tip = $( this ).val();
    } );

  $( "input" ).bind( "keyup change", function ( e ) {
    inputred();

    var cus = parseFloat( $( ".btn_percent--custom" ).val() ) || 0;

    custom = cus * 0.01;

    if ( cus > 0 ) {
      tip = custom;
    } else {
      tip = tip;
    }

    //calculation
    var bill = parseFloat( $( ".bill-input_form" ).val() ) || 0;
    var people = parseFloat( $( ".people-amount_form" ).val() ) || 0;
    var share = bill / people;

    var tipamount = share * tip;
    var total = share + tipamount;

    if ( !isNaN( tipamount ) && tipamount !== Infinity ) {
      $( "#tip-amount_per-person" ).text( "$" + tipamount.toFixed( 2 ) );
    }

    if ( !isNaN( tipamount ) && tipamount !== Infinity ) {
      $( "#tip-amount_total" ).text( "$" + total.toFixed( 2 ) );
    }
  } );
} );