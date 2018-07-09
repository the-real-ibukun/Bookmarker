//Listen for form Submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

//Save Bookmark
function saveBookmark(e){
    //Getting form input
    var siteName = document.getElementById("siteName").value;
     
    var siteUrl = document.getElementById("siteUrl").value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    }
    
     
    
    //Creating object for local storage
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
   /* 
    //Local Storage Test
    localStorage.setItem("test", "Hello  baby" );
    console.log(localStorage.getItem("test"));
    localStorage.removeItem("test");
    console.log(localStorage.getItem("test"));
     */
    
    
    if(localStorage.getItem("bookmarks") === null ){
        //init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to LocalStroge
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        
    } else{
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        //  Add bookmark to array
        bookmarks.push(bookmark);
        //  Re-set back to LocalStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    
    // Form reset
    document.getElementById("myForm").reset();
    
    //Re fetch bookmarks
    fetchBookmarks();
    
    //Prevent form from submitting
    e.preventDefault();
}
function deleteBookmark(url){
    //Get bookmark
    var bookmarks =  JSON.parse(localStorage.getItem("bookmarks"));
    // Loop through bookmark
    for(var i=0; i <= bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Delete url
            bookmarks.splice(i, 1);
        }
   
    }
    // Re-set back to localStorage
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    
    //Re fetch bookmarks
    fetchBookmarks();
}

function fetchBookmarks(){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    
    
    // Get output id forHTML views
    var bookmarksResults = document.getElementById("bookmarksResults");
    
    // Build output
    bookmarksResults.innerHTML = " ";
    
    for(var i = 0; i <= bookmarks.length; i++ ){
        var name =  bookmarks[i].name;
        var url = bookmarks[i].url;
   
    
   // console.log(bookmarks);
    bookmarksResults.innerHTML += '<div class="well">' +
                                    
                                    '<h3>'+
                                    name+
                                    '<a class="btn btn-default" target="_blank" href="  '+url+  '   ">  Visit </a>'+  
                                    ' '+
                                    '<a class="btn btn-danger"  onclick="deleteBookmark(\''+url+'\')"> Delete </a>'+
                                    '</h3>'
                                    +
                                  '</div>'; 
    }
        

}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert("Enter Information");
        return false;
    }
    
   var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
   var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert("Enter correct URL");
        return false;
    }
    
    
    return true;
}

