
(function( $ ){
    var _className = 'table_coloring';

    var settings = {
        columns: 5,
        rows: 6,        
        colors: ['#BABEBA','#A1F3C0','#3AC06E','#49B351','#0EAD1B'],
        name: 'my demo table'
    }

    var methods = {
        init : function( options ) {
 
            return this.each(function(){
              
                var $this = $(this),
                    data = $this.data('table_coloring'),
                    table_coloring = $('<div />', {
                    text : $this.attr('title')
                });
                
                if ( options ) {
                    $.extend( settings, options );
                }
                
                var elem = '<tr>';
                for (var i=0;i<columns;i++) {
                    elem += '<td><input type="text" class="coloring"/></td>';
                }
                elem += '</tr>';
                var table = "<table><caption>"+name+"</caption>";
                for (var i = 0; i < rows; i++ ) {
                    table += elem;
                };
                table += '</table>';
                $this.append(table);             
             }
           });
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
        count_row: function(){},
        count_column: function(){},
        count_diagonal: function(){}

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