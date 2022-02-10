// generate a unique uuid
export const Uuid = () => {
        return 'xxxx-yxxx-xxxxx'.replace(/[xy]/g, function(c) {
         return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16);            
        })
}
