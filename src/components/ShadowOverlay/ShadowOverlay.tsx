function ShadowOverlay({show}: {show: boolean}) {
  return (
    <div
      style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}
      className={`absolute top-0 left-0 w-full h-full ${show ? 'z-40' : 'z-[-40]'} transition-all duration-100 ease-in-out`}
    >
    </div>
  );
};

export default ShadowOverlay;