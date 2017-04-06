module.exports = {
	isArrayValid : function(array) {
        if(array && array.constructor === Array && array.length)
            return true;
        else
            return false;
    },

    isStringValid : function(string) {
    	if(string && string.constructor === String && string !== 'null' && string !== 'undefined')
    		return true;
    	else 
            return false;
    },

    convertObjectToString : function(object) {
    	try {
    		return JSON.stringify(object);
    	} catch (e) {
    		return '';
    	}
    },

    convertStringtoObject : function(string) {
    	try {
    		return JSON.parse(string);
    	} catch (e) {
    		return '';
    	}
    }
}