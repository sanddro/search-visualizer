/**
 * @return {string}
 */
export function CssVars(params) {
  let res = '';

  for (const key in params)
    res += `--${key}: ${params[key]};`;

  return res;
}
