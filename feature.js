// latest fashion of exporting and importing(by changing type to module in package.json)
const gfName = "Mrs Random";
const gf2 = "Hello";
const gf3 = "hi";
// module.exports = gfName;
export default gfName;
export {gf2,gf3};

export const generateLovePerc = ()=>{
    return `${Math.floor(Math.random()*100)}%`;
}
