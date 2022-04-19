export function JSONtoFormData(json: any): FormData {
  const form = new FormData();
  Object.keys(json).forEach((key) => {
    form.append(key, json[key]);
  });
  return form;
}
