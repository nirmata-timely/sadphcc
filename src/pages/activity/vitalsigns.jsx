const Vitalsigns = ({ trigger = false, setTrigger }) => {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close" onClick={() => setTrigger(false)}>
          <IoMdCloseCircleOutline className="close" />
        </button>
        <h2>Add Vital Signs</h2>
        {/* Add your input fields or other content here */}
      </div>
    </div>
  ) : null;
};

export default Vitalsigns;
