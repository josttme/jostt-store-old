import { PropTypes } from 'prop-types'

export function Input({
	id,
	name,
	label,
	type,
	placeholder,
	messageError,
	...props
}) {
	return (
		<fieldset className='className="mx-auto text-center" max-w-5xl'>
			<label
				className="mb-2 block text-sm font-medium text-gray-900"
				htmlFor={id}
			>
				{label}
			</label>
			<input
				className={`${
					messageError && 'border-red-500'
				} w-full rounded-lg border-2 border-gray-300 p-4 pe-12 text-sm shadow-sm`}
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				{...props}
				required
			/>
			{messageError && <p className="text-red-500">{messageError}</p>}
		</fieldset>
	)
}
Input.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	messageError: PropTypes.string
}
