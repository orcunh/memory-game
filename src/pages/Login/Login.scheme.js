import * as Yup from 'yup';
import i18n from 'i18next';

const schema = () =>
  Yup.object({
    name: Yup.string()
      .min(2, i18n.t('errors.minChar', { min: 2 }))
      .required(i18n.t('errors.required')),
  });

export default schema;
