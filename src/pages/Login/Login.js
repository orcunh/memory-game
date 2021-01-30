import React from 'react';
import { Button, Form, Segment, Header } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { setUser } from '../../app/gameSlice';

import { StyledWrapper, StyledContent } from './Login.styles';
import schema from './Login.scheme';

export const LoginPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: ({ name }) => {
      dispatch(setUser(name));
      history.push('/');
    },
  });

  return (
    <StyledWrapper>
      <StyledContent>
        <Header as="h2" color="blue" textAlign="center">
          {t('login.header')}
        </Header>
        <Form size="large" onSubmit={formik.handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              id="name"
              placeholder={t('login.placeholder')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
            />

            <Button type="submit" color="blue" fluid size="large">
              {t('login.button')}
            </Button>
          </Segment>
        </Form>
      </StyledContent>
    </StyledWrapper>
  );
};
