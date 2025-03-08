

function SendInviteForm () {

    return (
        <>
         \<>
  {/* component */}
  {/* Code on GiHub: https://github.com/vitalikda/form-floating-labels-tailwindcss */}
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n  .-z-1 {\n    z-index: -1;\n  }\n\n  .origin-0 {\n    transform-origin: 0%;\n  }\n\n  input:focus ~ label,\n  input:not(:placeholder-shown) ~ label,\n  textarea:focus ~ label,\n  textarea:not(:placeholder-shown) ~ label,\n  select:focus ~ label,\n  select:not([value='']):valid ~ label {\n    /* @apply transform; scale-75; -translate-y-6; */\n    --tw-translate-x: 0;\n    --tw-translate-y: 0;\n    --tw-rotate: 0;\n    --tw-skew-x: 0;\n    --tw-skew-y: 0;\n    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))\n      skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n    --tw-scale-x: 0.75;\n    --tw-scale-y: 0.75;\n    --tw-translate-y: -1.5rem;\n  }\n\n  input:focus ~ label,\n  select:focus ~ label {\n    /* @apply text-black; left-0; */\n    --tw-text-opacity: 1;\n    color: rgba(0, 0, 0, var(--tw-text-opacity));\n    left: 0px;\n  }\n"
    }}
  />
  <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
    <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
      <h1 className="text-2xl font-bold mb-8">Form With Floating Labels</h1>
      <form id="form" noValidate="">
        <div className="relative z-0 w-full mb-5">
          <input
            type="text"
            name="name"
            placeholder=" "
            required=""
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          />
          <label
            htmlFor="name"
            className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
          >
            Enter name
          </label>
          <span className="text-sm text-red-600 hidden" id="error">
            Name is required
          </span>
        </div>
        <div className="relative z-0 w-full mb-5">
          <input
            type="email"
            name="email"
            placeholder=" "
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          />
          <label
            htmlFor="email"
            className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
          >
            Enter email address
          </label>
          <span className="text-sm text-red-600 hidden" id="error">
            Email address is required
          </span>
        </div>
        
        <fieldset className="relative z-0 w-full p-px mb-5">
          <legend className="absolute text-gray-500 transform scale-75 -top-3 origin-0">
            Bride or Groom guest
          </legend>
          <div className="block pt-3 pb-2 space-x-4">
            <label>
              <input
                type="radio"
                name="radio"
                defaultValue={1}
                className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
              />
              Bride
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                defaultValue={2}
                className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
              />
              Groom
            </label>
          </div>
          <span className="text-sm text-red-600 hidden" id="error">
            Option has to be selected
          </span>
        </fieldset>

        <div className="relative z-0 w-full mb-5">
          <select
            name="select"
            value=""
            onclick="this.setAttribute('value', this.value);"
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          >
            <option value="" selected="" disabled="" hidden="" />
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
            <option value={5}>Option 5</option>
          </select>
          <label
            htmlFor="select"
            className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
          >
            Allowed plus one
          </label>
          <span className="text-sm text-red-600 hidden" id="error">
            Option has to be selected
          </span>
        </div>


        
        <div className="relative z-0 w-full mb-5">
          <input
            type="number"
            name="money"
            placeholder=" "
            className="pt-3 pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          />
          <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">$</div>
          <label
            htmlFor="money"
            className="absolute duration-300 top-3 left-5 -z-1 origin-0 text-gray-500"
          >
            Amount
          </label>
          <span className="text-sm text-red-600 hidden" id="error">
            Amount is required
          </span>
        </div>
       
        <button
          id="button"
          type="button"
          className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</>

        </>
    )
}