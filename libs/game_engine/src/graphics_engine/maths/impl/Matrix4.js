import { Vector4 } from "./Vector4.js";
export class Matrix4 {
    constructor(arrayMatrix) {
        this.arrayMatrix = arrayMatrix;
    }
    /**
     * Единичная матрица 4x4
     */
    static identity() {
        return new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }
    getArray() {
        return this.arrayMatrix;
    }
    multiplyMatrix(matrix) {
        const a11 = this.a11() * matrix.a11() + this.a12() * matrix.a21() + this.a13() * matrix.a31() + this.a14() * matrix.a41();
        const a12 = this.a11() * matrix.a12() + this.a12() * matrix.a22() + this.a13() * matrix.a32() + this.a14() * matrix.a42();
        const a13 = this.a11() * matrix.a13() + this.a12() * matrix.a23() + this.a13() * matrix.a33() + this.a14() * matrix.a43();
        const a14 = this.a11() * matrix.a14() + this.a12() * matrix.a24() + this.a13() * matrix.a34() + this.a14() * matrix.a44();
        const a21 = this.a21() * matrix.a11() + this.a22() * matrix.a21() + this.a23() * matrix.a31() + this.a24() * matrix.a41();
        const a22 = this.a21() * matrix.a12() + this.a22() * matrix.a22() + this.a23() * matrix.a32() + this.a24() * matrix.a42();
        const a23 = this.a21() * matrix.a13() + this.a22() * matrix.a23() + this.a23() * matrix.a33() + this.a24() * matrix.a43();
        const a24 = this.a21() * matrix.a14() + this.a22() * matrix.a24() + this.a23() * matrix.a34() + this.a24() * matrix.a44();
        const a31 = this.a31() * matrix.a11() + this.a32() * matrix.a21() + this.a33() * matrix.a31() + this.a34() * matrix.a41();
        const a32 = this.a31() * matrix.a12() + this.a32() * matrix.a22() + this.a33() * matrix.a32() + this.a34() * matrix.a42();
        const a33 = this.a31() * matrix.a13() + this.a32() * matrix.a23() + this.a33() * matrix.a33() + this.a34() * matrix.a43();
        const a34 = this.a31() * matrix.a14() + this.a32() * matrix.a24() + this.a33() * matrix.a34() + this.a34() * matrix.a44();
        const a41 = this.a41() * matrix.a11() + this.a42() * matrix.a21() + this.a43() * matrix.a31() + this.a44() * matrix.a41();
        const a42 = this.a41() * matrix.a12() + this.a42() * matrix.a22() + this.a43() * matrix.a32() + this.a44() * matrix.a42();
        const a43 = this.a41() * matrix.a13() + this.a42() * matrix.a23() + this.a43() * matrix.a33() + this.a44() * matrix.a43();
        const a44 = this.a41() * matrix.a14() + this.a42() * matrix.a24() + this.a43() * matrix.a34() + this.a44() * matrix.a44();
        return new Matrix4([
            a11, a12, a13, a14,
            a21, a22, a23, a24,
            a31, a32, a33, a34,
            a41, a42, a43, a44,
        ]);
    }
    multiplyVector(vector) {
        return new Vector4(this.a11() * vector.getX() + this.a12() * vector.getY() + this.a13() * vector.getZ() + this.a14() * vector.getW(), this.a21() * vector.getX() + this.a22() * vector.getY() + this.a23() * vector.getZ() + this.a24() * vector.getW(), this.a31() * vector.getX() + this.a32() * vector.getY() + this.a33() * vector.getZ() + this.a34() * vector.getW(), this.a41() * vector.getX() + this.a42() * vector.getY() + this.a43() * vector.getZ() + this.a44() * vector.getW());
    }
    a11() {
        return this.arrayMatrix[0];
    }
    a12() {
        return this.arrayMatrix[1];
    }
    a13() {
        return this.arrayMatrix[2];
    }
    a14() {
        return this.arrayMatrix[3];
    }
    a21() {
        return this.arrayMatrix[4];
    }
    a22() {
        return this.arrayMatrix[5];
    }
    a23() {
        return this.arrayMatrix[6];
    }
    a24() {
        return this.arrayMatrix[7];
    }
    a31() {
        return this.arrayMatrix[8];
    }
    a32() {
        return this.arrayMatrix[9];
    }
    a33() {
        return this.arrayMatrix[10];
    }
    a34() {
        return this.arrayMatrix[11];
    }
    a41() {
        return this.arrayMatrix[12];
    }
    a42() {
        return this.arrayMatrix[13];
    }
    a43() {
        return this.arrayMatrix[14];
    }
    a44() {
        return this.arrayMatrix[15];
    }
    transpose() {
        return new Matrix4([
            this.a11(), this.a21(), this.a31(), this.a41(),
            this.a12(), this.a22(), this.a32(), this.a42(),
            this.a13(), this.a23(), this.a33(), this.a43(),
            this.a14(), this.a24(), this.a34(), this.a44()
        ]);
    }
    /*
               | a11  a12  a13  a14 |         | a22  a23  a24 |         | a21  a23  a24 |         | a21  a22  a24 |         | a21  a22  a23 |
        detA = | a21  a22  a23  a24 | = a11 * | a32  a33  a34 | - a12 * | a31  a33  a34 | + a13 * | a31  a32  a34 | - a14 * | a31  a32  a33 | = a11 * (a22 * | a33  a34 | - a23 * | a32  a34 | + a24 * | a32  a33 |) - a12 * (a21 * | a33  a34 | - a23 * | a31  a34 | + a24 * | a31  a33 |) + a13 * (a21 * | a32  a34 | - a22 * | a31  a34 | + a24 * | a31  a32 |) - a14 * (a21 * | a32  a33 | - a22 * | a31  a33 | + a23 * | a31  a32 |) =
               | a31  a32  a33  a34 |         | a42  a43  a44 |         | a41  a43  a44 |         | a41  a42  a44 |         | a41  a42  a43 |                | a43  a44 |         | a42  a44 |         | a42  a43 |                 | a43  a44 |         | a41  a44 |         | a41  a43 |                 | a42  a44 |         | a41  a44 |         | a41  a42 |                 | a42  a43 |         | a41  a43 |         | a41  a42 |
               | a41  a42  a43  a44 |

             = a11 * (a22 * (a33 * a44 - a43 * a34) - a23 * (a32 * a44 - a42 * a34) + a24 * (a32 * a43 - a42 * a33)) - a12 * (a21 * (a33 * a44 - a43 * a34) - a23 * (a31 * a44 - a41 * a34) + a24 * (a31 * a43 - a41 * a33)) + a13 * (a21 * (a32 * a44 - a42 * a34) - a22 * (a31 * a44 - a41 * a34) + a24 * (a31 * a42 - a41 * a32)) - a14 * (a21 * (a32 * a43 - a42 * a33) - a22 * (a31 * a43 - a41 * a33) + a23 * (a31 * a42 - a41 * a32)) =
             = a11 * (a22 * a33a44_43a34 - a23 * a32a44_a42a34 + a24 * a32a43_a42a33) - a12 * (a21 * a33a44_43a34 - a23 * a31a44_a41a34 + a24 * a31a43_a41a33) + a13 * (a21 * a32a44_a42a34 - a22 * a31a44_a41a34 + a24 * a31a42_a41a32) - a14 * (a21 * a32a43_a42a33 - a22 * a31a43_a41a33 + a23 * a31a42_a41a32)
     */
    determinant() {
        const a33a44_43a34 = this.a33() * this.a44() - this.a43() * this.a34();
        const a32a44_a42a34 = this.a32() * this.a44() - this.a42() * this.a34();
        const a32a43_a42a33 = this.a32() * this.a43() - this.a42() * this.a33();
        const a31a44_a41a34 = this.a31() * this.a44() - this.a41() * this.a34();
        const a31a43_a41a33 = this.a31() * this.a43() - this.a41() * this.a33();
        const a31a42_a41a32 = this.a31() * this.a42() - this.a41() * this.a32();
        return this.a11() * (this.a22() * a33a44_43a34 - this.a23() * a32a44_a42a34 + this.a24() * a32a43_a42a33) - this.a12() * (this.a21() * a33a44_43a34 - this.a23() * a31a44_a41a34 + this.a24() * a31a43_a41a33) + this.a13() * (this.a21() * a32a44_a42a34 - this.a22() * a31a44_a41a34 + this.a24() * a31a42_a41a32) - this.a14() * (this.a21() * a32a43_a42a33 - this.a22() * a31a43_a41a33 + this.a23() * a31a42_a41a32);
    }
}
