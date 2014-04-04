
(function( $ ){
    var _className = 'table_coloring';

    var settings = {
        columns: 2,
        rows: 5,
        name: 'default',        
        colors: ['#BABEBA','#A1F3C0','#3AC06E','#49B351','#0EAD1B'],
        colors_number: 5,

    }

    var methods = {

        //this method 
        // set default color for it 
        //and add behavior to the cells
        init : function( options ) {
          if ( options ) {
            $.extend( settings, options );
          }
          return this;

        },

        //set settings at the admin page
        set_settings : function () {
          return this.each(function(){
            var $this = $(this);
            //set number of rows and columns            
             $('.table_settings button').on('click', function(){
              var rows=0, colums=0, colors_number=0, colors ='';

              rows = $('.table_size input.rows').val();
              //I want to add some validation to the each setting
              if(rows) {
                settings.rows = rows;
              }

              name = $('input.table_name').val();
              if(name) {
                settings.name = name;
              }

              columns = $('.table_size input.columns').val();
              if(colums) {
                settings.columns = colums;
              }

              colors_number = $('.colors_number input').val(); 
              if(colors_number) {
                settings.colors_number = colors_number;
              }

              colors = $('.colors input').val().split(',');
              if(colors) {
                settings.colors = colors;  
              }
              
              console.log('settings', settings);
            });
           });
        },
        //this method draw table 
        draw_table : function() {
            
            return this.each(function(){
              
                var $this = $(this),                    
                    table = '<table class="'+_className+'">';                  
                //create table 
                for (var i=0;i<settings.rows;i++) {
                  row = '<tr>';                        
                  for(var j=0;j<settings.columns;j++) {              
                    row += '<td data-row="'+i+'" data-column="'+j+'" data-color="'+0+'"></td>';                    
                  }
                  row += '</tr>';
                  table += row;
                }                      

                table += '</table>';                                
                $this.append(table);
                $this.after('<button class="save_colors">Save</button>');
                //set default color for the table
                $this.find('.'+_className).css('background-color', settings.colors[0]);

                //set behavior of cells
                $('.'+_className+' td').on('click', function() {        
                  var color = $(this).data('color');                  
                  color++; 
                  color = color % settings.colors_number;
                  $(this).data("color", color);       
                  $(this).css("background-color", settings.colors[color]);  
                });
                $(".save_colors").on("click", function(){
                  $this.table_coloring("save", {});
                });              
             }); 
        },
        //this method pick up numbers of color for the each cell
        save : function() {
                    
          //create and init empty array of colors
          var colored_table = [];
          for (var i=0;i<settings.rows;i++) {  
            colored_table[i] = [];
            for(var j=0;j<settings.columns;j++) {
              colored_table[i][j] = [];
            }
          }

          //set current values to the array of colors
          var row = '';
          for (var i=0;i<settings.rows;i++) {                              
            row = $("table").find("[data-row='" + i + "']");              
            
            for(var j=0;j<settings.columns;j++) {
              colored_table[i][j] = $(row[j]).data("color");                             
            }                        
          }

          //display values in console
          console.log(colored_table);
        },

        destroy : function( ) {

            return this.each(function(){

             var $this = $(this),
                 data = $this.data('table_coloring');

             $(window).unbind('.table_coloring');
             data.table_coloring.remove();
             $this.removeData('table_coloring');

            })

        },       

  };
 
  $.fn.table_coloring = function( method ) {
     
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.table_coloring' );
    }   
   
  };
 
})( jQuery );