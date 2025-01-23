export function generatePrompt(
  template: string,
  variables: Record<string, string>
): string {
  return Object.keys(variables).reduce((result, key) => {
    const placeholder = `{${key}}`;
    return result.replace(new RegExp(placeholder, "g"), variables[key]);
  }, template);
}
