// Copyright (c) 2000  Dustin Sallings dustin@spy.net
// Any work derived from this code must retain the above copyright.
// Please send all modifications of this script to me.
//
// modified by Andrew Irwin  irwin@aesop.rutgers.edu
// modified by Bryn Dole dole@bottlecount.com

function kittyCode() {

    // Make sure there's something in there before we do this.
    if(document.form.kittyinput.value.length > 0) {
        var parts=document.form.kittyinput.value.split('.');

	// Valid data will have five parts (the first and last are empty)
	// Parts are as follows:
	// 0 = empt	// 1 = id	// 2 = type	// 3 = code	// 4 = empty
	if(parts.length == 5) {
	    // clear the CueCat input, it just confuses the user.
	    document.form.kittyinput.value="";  
	    var code=decodePart(parts[3]);
	    document.form.c.value=code;
	    var type= decodePart(parts[2]);
	    document.form.type.value=type;

	    // clear the CueCat input, it just confuses the user.
	    document.form.kittyinput.value="";  
	    
	    var a = /IBN/; var b = /IB5/; var c = /C39/; var a1=/UA5/;
	    if (a.test(type)){
	      document.form.message.value="This is a Book. Not a UPC.";
	    } else if (c.test(type)) {
	      document.form.message.value="This is a Book. Not a UPC.";
	    } else if (b.test(type)) {
	      document.form.message.value="This is a Book. Not a UPC.";
	    } else if (a1.test(type)) {
	      document.form.message.value="This is a Book. Not a UPC.";
	    }
	    
	    var d = /CC/;
	    if (d.test(type)) {     
	      document.form.message.value="This is a CueCat Code. Not a UPC.";
	    }
	    
	}
    }
}

function decodePart(str) {
    var m = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-";
    var result = "";
    var packer = 0;
    var count = 0;
    
    var i = 0;
    for (i=0; i < str.length; i++) {
        // Get the offset to the current character in our map
        var x = m.indexOf(str.charAt(i));
	
	// For invalid characters, point them out really well!
	if(x<0) {
	    result += " > " + str.charAt(i) + " < ";
	    continue;
	}
	
	// only count valid characters...why not?
	count++;
	
	// Pack them bits.
	packer = packer << 6 | x
	  
	  // every four bytes, we have three valid characters.
	  if (count == 4) {
	      result += String.fromCharCode((packer >> 16) ^ 67);
	      result += String.fromCharCode((packer >> 8 & 255) ^ 67);
	      result += String.fromCharCode((packer & 255) ^ 67);
	      count=0; packer=0;
	  }
    }
    
    // Now, deal with the remainders
    if(count==2) {
        result += String.fromCharCode((( (packer << 12) >> 16) ^ 67));
    } else if(count == 3) {
        result += String.fromCharCode(( (packer << 6) >> 16) ^ 67);
	result += String.fromCharCode(( (packer << 6) >> 8 & 255) ^ 67);
    }
    return result;
}

function decodeCC(str) {
    var m = "0123456789ABCDEF";
    var result = "";	
    var i = 0;
    for (i=0; i < str.length; i++) {
        var x = str.charCodeAt(i)-32;
	if (x<10) x = "0"+x;
	result += x+" "; // convert x to string
    }
    return result;
}

function upcHandler(){
    if ((document.form.type.value == "UPA") | 
	(document.form.type.value == "UPE") ) {
        window.location.href="http://www.upcdatabase.com/item.pl?upc="+document.form.c.value;
    }
}

function upcGifHandler(){
    if ((document.form.type.value == "UPA") | 
	(document.form.type.value == "UPE") ) {
        window.location.href="http://thor-gw.phys.ualberta.ca/cgi-bin/barcode-request.pl?barcodenum="+document.form.c.value;
    }
}


// sample cue cat scans from RS catalogue
// .C3nZC3nZC3nZC3jYDNrZC3nX.aabI.y2nIy244.	C 01 00 00 01 00 13 91
// .C3nZC3nZC3nZC3jYDNrZC3nX.aabI.y2nIy2HW.	C 01 00 00 01 00 11 19
// .C3nZC3nZC3nZC3jYDNrZC3nX.aabI.y2nIy2H3.	C 01 00 00 01 00 11 20
// .C3nZC3nZC3nZC3jYDNrZC3nX.aabI.y2nIy2fG.	C 01 00 00 01 00 02 03
// .C3nZC3nZC3nZC3jYDNrZC3nX.aabI.y2nIy28B.	C 01 00 00 01 00 12 56
