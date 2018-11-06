export default function getReadableSize (size){
    let index = Math.floor( Math.log(size) / Math.log(1024) );
    let vals = ['B', 'kB', 'MB', 'GB', 'TB'];
    return ( (size / 1024).toFixed(5).toString()  + ' ' + vals[index]);
};
