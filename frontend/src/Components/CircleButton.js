import '../Styles/CircleButton.css';

const CircleButton = ({ children, img, main, width='75%', height='75%' }) => {
    return (
        <button className={ main ? "Btn-main Btn" : 'Btn'}>
            <img 
                className='Icon' 
                src={img}
                style={{
                    width,
                    height
                }}
            />
            <span className="tooltip">{children}</span>
        </button>
    )
}

export default CircleButton