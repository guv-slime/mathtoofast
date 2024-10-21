export default function CoolButton () {
  return (
    <div className="relative">
      <button type="submit" className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 translate- z-20 w-[200px] h-[100px]">Submit</button>
      <div className="cool-button absolute z-10"></div>
      <div className="warm-button"></div>
    </div>
  )
}
