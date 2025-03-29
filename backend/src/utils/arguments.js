export default function(field, def) {
  try {
    const args = process.argv.slice(2);
    const index = args.indexOf(field);
    const value = index !== -1 
      && index + 1 < args.length 
      ? args[index + 1] 
      : null;
    const result = value !== null 
      ? value 
      : (args.length > 0 
          ? args[0] 
          : def
        );

    return result;
  } catch(err) {
    log(3, 'sc.arguments »', err.message);
    return;
  }
}