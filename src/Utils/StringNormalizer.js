class StringNormalizer   {


    constructor(){
        this.charsToNormalize = [
            '(',
            ')',
            ',',
            ';',
            '.'
        ]
    }


    /**
     * Normalizea word with multiple fixes
     * @param char character to normalize
     * @returns {*}
     */
     normalize(char){
         char = char.trim();
         char = char.toLowerCase();

        this.charsToNormalize.forEach((charToClean)=>{
            char = this.replaceAll(char,charToClean,'');
        });

        return char;
    }


    /**
     * Function to replace all iterations of letter on a word
     * @param str
     * @param replaceWhat
     * @param replaceTo
     * @returns {void | string | * | boolean}
     */
    replaceAll(str,replaceWhat,replaceTo){
        let strRegEx =`[${replaceWhat}]`;  //set regex with variables
        var re = new RegExp(strRegEx, 'g');
        return str.replace(re,replaceTo);
    }


}


export  default StringNormalizer;
