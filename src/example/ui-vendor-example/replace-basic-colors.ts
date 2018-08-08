export const replaceBasicColors = (p_node: Node, p_value: string) => {
  console.log(p_value);
  if(p_node.nodeValue){
    p_node.nodeValue = p_node
    .nodeValue
    .replace(/(red)/g, '#ff0000')
    .replace(/(green)/g, '#00ff00')
    .replace(/(blue)/g, '#0000ff')
    .replace(/(black)/g, '#000000')
    .replace(/(yellow)/g, '#f0ff02')
    .replace(/(white)/g, '#ffffff')
    .replace(/(pink)/g, '#f900ff');
  }
};