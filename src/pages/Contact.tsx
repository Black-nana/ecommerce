
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string(),
  company: Yup.string(),
  message: Yup.string().required('Message is required'),
  agreeToPolicies: Yup.boolean().oneOf([true], 'You must agree to the privacy policy'),
});

const Contact = () => {
interface FormValues {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phoneNumber: string;
    message: string;
    agreeToPolicies: boolean;
}

const handleSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    console.log(values);
    toast.success('Message sent successfully');
    toast.success('we will get back to you soon');
    resetForm();
};

  return (
    <div className='py-20'>
      <div className="isolate px-6 lg:px-8">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            phoneNumber: '',
            message: '',
            agreeToPolicies: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className=''>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-accent-content">
                  First name
                </label>
                <div className="mt-2.5">
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-600" />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-accent-content">
                  Last name
                </label>
                <div className="mt-2.5">
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-600" />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-accent-content">
                  Company
                </label>
                <div className="mt-2.5">
                  <Field
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="company" component="div" className="text-red-600" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-accent-content">
                  Email
                </label>
                <div className="mt-2.5">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600" />
                </div>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold leading-6 text-accent-content">
                  Phone number
                </label>
                <div className="mt-2.5">
                  <Field
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-600" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-accent-content">
                  Message
                </label>
                <div className="mt-2.5">
                  <Field
                    as="textarea"
                    name="message"
                    id="message"
                    rows="4"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="message" component="div" className="text-red-600" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-4 sm:col-span-2 items-center">
              <Field type="checkbox" name="agreeToPolicies" id="agreeToPolicies" className="mr-2" />
              <label htmlFor="agreeToPolicies" className="text-sm leading-6 text-accent-content">
                By selecting this, you agree to our{' '}
                <a href="your_privacy_policy_url" className="font-semibold text-blue-500">
                  privacy policy
                </a>
                .
              </label>
              <ErrorMessage name="agreeToPolicies" component="div" className="text-red-600" />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-[#716acd] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#8d98d9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d98d9]"
              >
                Let's talk
              </button>
            </div>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;
