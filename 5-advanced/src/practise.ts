type Combinables = string | number;
type Numerics = number | boolean;

type Universals = Combinables & Numerics;

function adds(a: number, b: number): number;
function adds(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const results = adds('Max', 'Schwarz');
results.split(' ');
