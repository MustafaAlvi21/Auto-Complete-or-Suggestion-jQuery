<head>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
      
      
      async function autoSuggestionTagFind() {
            category = document.getElementsByName("category")[0].value;
            sub_category = document.getElementsByName("sub_category")[0].value;

            console.log("category => " + category);
            console.log("sub_category => " + sub_category);
            
            if(typeof category != "undefined" && category != "" && typeof sub_category != "undefined" && sub_category != ""){
               
               a= await fetch(`http://localhost:4000/classifieds/tags/auto-suggestions/${category}/${sub_category}`)
                .then(response => response.json())
                .then(data => {
                    var items = data 
                      console.log(items);                
                      function split( val ) {
                      return val.split( /,\s*/ );
                    }
                    function extractLast( term ) {
                      return split( term ).pop();
                    }
                
                    $( "#tags" )    //  it is the id of the tag where you want to show suggestions.
                    .autocomplete({
                        minLength: 0,
                        source: function( request, response ) {
                          response( $.ui.autocomplete.filter( items, extractLast( request.term ) ) );
                        },
                        focus: function() {
                          return false;
                        },
                        select: function( event, ui ) {
                          var terms = split( this.value );
                          // remove the current input
                          terms.pop();
                          // add the selected item
                          terms.push( ui.item.value );
                          // add placeholder to get the comma-and-space at the end
                          terms.push( "" );
                          this.value = terms.join( ", " );
                          return false;
                        }
                    });
                    return data                    
                });
            }
        }
