# coders-reference

Basic webpage created in the process of learning Javascript (initially from a calculator tutorial, then branching out).

The calculator uses eval(), which I understand is not fantastic for user safety.
It features simple arithmetics operations, basic trigonometry functions, and a few other operands relavent to computers.

The page for floats uses 8-byte double precision IEEE-754 notation:
    - MSB determines sign
    - next 11 bits as exponent
    - remaining bits as fraction
Currently, only conversion from hex to float works.

The page for logic will include a few truth tables and a boolean logic calculator.