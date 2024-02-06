const FormField = ({
  id,
  label,
  type,
  name,
  options, // For select dropdowns
  value,
  onChange,
  placeholder,
  error,
  children, // For custom content, such as options in a select
}) => {
  const inputClassNames =
    'bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400';

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClassNames}
          />
        );
      case 'select':
        return (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClassNames}
          >
            {children ||
              options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClassNames}
          />
        );
    }
  };

  return (
    <div className="mb-10">
      <label
        htmlFor={id}
        className="block mb-2 text-base font-extrabold text-gray-900 dark:text-white"
      >
        {label}
        <span className="text-red-600"> *</span>
      </label>
      {renderInput()}
      {error && (
        <p className="text-red-500 text-xs font-normal mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;

// const FormField = ({
//   id,
//   label,
//   type,
//   name,
//   value,
//   onChange,
//   placeholder,
//   error,
// }) => (
//   <div className="mb-10">
//     <label
//       htmlFor={id}
//       className="block mb-2 text-base font-extrabold text-gray-900 dark:text-white"
//     >
//       {label}
//       <span className="text-red-600"> *</span>
//     </label>
//     <input
//       type={type}
//       name={name}
//       id={id}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
//     />
//     {error && <p className="text-red-500 text-xs font-normal mt-1">{error}</p>}
//   </div>
// );

// export default FormField;
