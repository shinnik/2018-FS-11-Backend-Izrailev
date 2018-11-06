export const b = 'B';
export const kb = 'kB';
export const mb = 'MB';
export const gb = 'GB';
export const tb = 'TB';
export const getReadableSize = function(size){
    let index = Math.floor( Math.log(size) / Math.log(1024) );
    let vals = ['B', 'kB', 'MB', 'GB', 'TB'];
    return ( (size / 1024).toFixed(5).toString()  + ' ' + vals[index]);
};
