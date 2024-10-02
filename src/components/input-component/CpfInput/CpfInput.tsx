"use client";

import { TextInput } from "@tremor/react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import { MyFormData } from "@/app/page";

interface CpfInputProps {
    register: UseFormRegister<MyFormData>;
    name: keyof MyFormData;
    value: string;
    setValue: UseFormSetValue<MyFormData>;
    error: boolean;
    disabled?: boolean
}

export default function CpfInput({ register, name, value, setValue, disabled, error }: CpfInputProps) {
    const [isCpfValid, setIsCpfValid] = useState(true);

    const validateCpf = (cpf: string) => {
        cpf = cpf.replace(/\D/g, "");

        if (cpf.length !== 11) {
            return false;
        }

        const invalidCpfs = [
            "00000000000",
            "11111111111",
            "22222222222",
            "33333333333",
            "44444444444",
            "55555555555",
            "66666666666",
            "77777777777",
            "88888888888",
            "99999999999"
        ];
        if (invalidCpfs.includes(cpf)) {
            return false;
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf[i]) * (10 - i);
        }
        let firstCheckDigit = (sum * 10) % 11;
        firstCheckDigit = firstCheckDigit === 10 ? 0 : firstCheckDigit;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf[i]) * (11 - i);
        }
        let secondCheckDigit = (sum * 10) % 11;
        secondCheckDigit = secondCheckDigit === 10 ? 0 : secondCheckDigit;

        return firstCheckDigit === parseInt(cpf[9]) && secondCheckDigit === parseInt(cpf[10]);
    };

    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, "");

        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{3})/, "$1.$2");
        }

        setValue(name, value);

        const rawCpf = value.replace(/\D/g, "");
        setIsCpfValid(rawCpf.length === 11 ? validateCpf(rawCpf) : true);
    };

    return (
        <div className="w-full max-w-md">
            <TextInput
                placeholder="Informe seu CPF"
                className={`w-full ${!isCpfValid ? "border-red-500" : ""}`}
                {...register(name, {
                    required: "CPF é obrigatório",
                    validate: () => isCpfValid || "CPF inválido"
                })}
                value={value}
                maxLength={14}
                onChange={handleCpfChange}
                disabled={disabled}
                error={error}
            />
            {!isCpfValid && (
                <span className="text-red-500 text-sm">
                    CPF inválido
                </span>
            )}
        </div>
    );
}