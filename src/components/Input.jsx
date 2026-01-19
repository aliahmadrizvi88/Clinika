const Input = ({ type, label, id, value, onChange, ...props }) => {
  return (
    <div className="w-full">
      <div className="relative h-12 flex rounded-xl">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required
          className="peer w-full px-4 text-base rounded-xl bg-white border border-gray-300 outline-none
                     focus:shadow-md focus:border-[#3bbb9c]"
          {...props}
        />

        <label
          htmlFor={id} // ✅ FIXED
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-2 text-base text-gray-500
                     transition-all duration-150
                     peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#3bbb9c]
                     peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#3bbb9c]"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
