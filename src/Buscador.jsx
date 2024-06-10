export const Buscador = ({onSubmit,valorInput,onChange}  ) => {
    return (
        
        <form onSubmit={onSubmit}>
        <input value={valorInput} onChange={onChange}/>
        </form>
        
    )
}