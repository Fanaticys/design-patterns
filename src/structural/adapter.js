// Say you have two classes with compatible interfaces:
// RoundHole and RoundPeg.
class RoundHole {
  constructor(radius) {}
  getRadius() {}
  // Return the radius of the hole.
  fits(peg) {
    return this.getRadius() >= peg.getRadius();
  }
}
class RoundPeg {
  constructor(radius) {}
  getRadius() {}
  // Return the radius of the peg.
}
// But there's an incompatible class: SquarePeg.
class SquarePeg {
  constructor(width) {}
  getWidth() {}
  // Return the square peg width.
}
// An adapter class lets you fit square pegs into round holes.
// It extends the RoundPeg class to let the adapter objects act
// as round pegs.
class SquarePegAdapter extends RoundPeg {
  // In reality, the adapter contains an instance of the
  // SquarePeg class.
  peg;
  constructor(peg) {
    this.peg = peg;
  }
  getRadius(){
    // The adapter pretends that it's a round peg with a
    // radius that could fit the square peg that the adapter
    // actually wraps.
    return peg.getWidth() * Math.sqrt(2) / 2
  }
}
// Somewhere in client code.
hole = new RoundHole(5)
rpeg = new RoundPeg(5)
hole.fits(rpeg) // true

small_sqpeg = new SquarePeg(2)
large_sqpeg = new SquarePeg(5)
hole.fits(small_sqpeg) // this won't compile (incompatible types)

small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg)
large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg)
hole.fits(small_sqpeg_adapter) // true
hole.fits(large_sqpeg_adapter) // false