calculationBlocks = []

function main() {
  const outputEl = document.getElementById('output')
  // add event listeners for nr keys
  numberKeys = document.getElementsByClassName('key-number')
  for (const numberKey of numberKeys) {
    numberKey.addEventListener('click', function() {
      outputEl.value += numberKey.innerHTML
    })
  }
  // event listener for clear button
  document.getElementById('key-clear').addEventListener(
    'click',
    function () {
      outputEl.value = ''
      calculationBlocks = []
    }
  )
  // event listeners for operations
  operationKeys = document.getElementsByClassName('key-operation')
  for (const operationKey of operationKeys) {
    operationKey.addEventListener('click', function () {
      // get all numbers after the last finished calculation block,
      // that means a given number that might be made out of multiple
      // digits and add it to the array. then also add the operation itself
      calculationBlocks.push(
        outputEl.value.split(calculationBlocks.at(-1)).at(-1)
      )
      // for some reason we have to remove empty elements
      calculationBlocks = calculationBlocks.filter(n => n)

      outputEl.value += operationKey.innerHTML
      calculationBlocks.push(operationKey.innerHTML)
      console.log('blocks now look like:', calculationBlocks)
    })
  }
  // event listener for the equal sign
  document.getElementById('key-equals').addEventListener(
    'click',
    function () {
      // first, generate a block out of the last trailing numbers
      calculationBlocks.push(
        outputEl.value.split(calculationBlocks.at(-1)).at(-1)
      )
      // loops through the blocks until it finds a priority op, like *
      // merges the operator and the numbers before and after
      // then does the same with low prio
      try {
        calculationBlocks.forEach(function (block, i) {

          if (block == '*') {
            mergedBlock = parseFloat(calculationBlocks[i-1]) * parseFloat(calculationBlocks[i+1])
            if (isNaN(mergedBlock)) { throw new Exception() }
            calculationBlocks[i] = mergedBlock
            calculationBlocks.splice(i+1, 1)
            calculationBlocks.splice(i-1, 1)
          }

          if (block == '/') {
            if (parseInt(calculationBlocks[i + 1]) == 0) {
              throw new Exception()
            }
            mergedBlock = parseFloat(calculationBlocks[i-1]) / parseFloat(calculationBlocks[i+1])
            if (isNaN(mergedBlock)) { throw new Exception() }
            calculationBlocks[i] = mergedBlock
            calculationBlocks.splice(i+1, 1)
            calculationBlocks.splice(i-1, 1)
          }
        })

        calculationBlocks.forEach(function (block, i) {

          if (block == '+') {
            mergedBlock = parseFloat(calculationBlocks[i-1]) + parseFloat(calculationBlocks[i+1])
            if (isNaN(mergedBlock)) { throw new Exception() }
            calculationBlocks[i] = mergedBlock
            calculationBlocks.splice(i+1, 1)
            calculationBlocks.splice(i-1, 1)
          }

          if (block == '-') {
            mergedBlock = parseFloat(calculationBlocks[i-1]) - parseFloat(calculationBlocks[i+1])
            if (isNaN(mergedBlock)) { throw new Exception() }
            calculationBlocks[i] = mergedBlock
            calculationBlocks.splice(i+1, 1)
            calculationBlocks.splice(i-1, 1)
          }
        })

        // lastly, make the outputfield the resulting string
        outputEl.value = calculationBlocks.join('')
      } catch (error) {
        outputEl.value = 'not how math works'
        calculationBlocks = []
      }
    }
  )
}

main()
