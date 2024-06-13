const Quote = () => {
  return (
    <div className="bg-gray-200 h-screen flex flex-col justify-center items-center gap-3 ">
      <div className="max-w-md">
        <p className="self-center flex-wrap font-bold text-2xl">
          "The costumer service I recieved was amazing. The support team went
          above and beyond to address my concerns"
        </p>
        <div className="self-start flex flex-col gap-1">
          <div className=" font-semibold">Jules Winnefield</div>
          <div className="text-gray-500">CEO, Acme Inc</div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
