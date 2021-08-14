function callAll(...fns) {
  console.log(arguments)
  return (...args) => {
    fns.forEach(fn => {
      fn && fn(...args)
    })
  }
}
function one(arg1) {
  console.log(arg1)
  console.log('one')
}

function two(arg1) {
  console.log(arg1)
  console.log('two')
}

callAll(one, two)
