function getReadableSize (size){
    if (typeof size === 'number') {
        let index = Math.floor( Math.log(size) / Math.log(1024) );
        let vals = ['B', 'kB', 'MB', 'GB', 'TB'];
        return ( (size / 1024).toFixed(5).toString()  + ' ' + vals[index]);
    } else if (typeof size === 'undefined') {
        throw new Error('No arguments were passed');
    } else {
        return false;
    }
};

module.exports = getReadableSize;
