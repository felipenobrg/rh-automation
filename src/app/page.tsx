/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Header } from "@/components/layout-component/Header";
import { Button, Select, SelectItem, TextInput } from "@tremor/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CpfInput from "@/components/input-component/CpfInput/CpfInput";

const sanitizeInput = (input: string) => input.replace(/[^\d]/g, "");

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{4}$/;

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  dataDeNascimento: z
    .string()
    .min(8, "Data de nascimento é obrigatória e deve ter mínimo 8 caracteres")
    .refine((data) => dateRegex.test(data), {
      message: "Data de nascimento inválida, deve estar no formato DDMMYYYY",
    }),
  rg: z.string().min(7, "RG é obrigatório e deve ter no mínimo 7 caracteres"),
  cpf: z
    .string()
    .min(14, "CPF deve conter 11 dígitos")
    .refine((cpf) => sanitizeInput(cpf).length === 11, {
      message: "CPF inválido",
    }),
  telefone: z.string()
    .max(15, "Celular no máximo 15 dígitos")
    .min(11, "Celular no mínimo 11 dígitos"),

  cep: z.string().min(8, "CEP é obrigatorio"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  enderecoCompleto: z.string().min(1, "Endereço completo é obrigatório"),
  nomeDaMae: z.string().min(1, "Nome da mãe é obrigatório"),
  nomeDoPai: z.string().min(1, "Nome do pai é obrigatório"),
  contaCorrente: z.string().min(1, "Conta Corrente é obrigatório"),
  racaOuCor: z.enum(["Branco", "Negro", "Pardo", "Indígena", "Amarelo"], {
    required_error: "Raça/Cor é obrigatória",
  }),
  sexo: z.enum(["Masculino", "Feminino"], {
    required_error: "Sexo é obrigatório",
  }),
  estadoCivil: z.enum(["Solteiro", "Casado", "Divorciado", "Viúvo"], {
    required_error: "Estado Civil é obrigatório",
  }),
  escolaridade: z.enum(
    [
      "Analfabeto",
      "Fundamental Incompleto",
      "Fundamental Completo",
      "Medio Incompleto",
      "Medio Completo",
      "Superior Incompleto",
      "Superior Completo",
    ],
    {
      required_error: "Escolaridade é obrigatória",
    }
  ),
  arquivos: z
    .any()
    .refine((files) => files?.length > 0, "Você deve selecionar pelo menos um arquivo"),
});


const documents = [
  "Carteira Digital de Trabalho (Página inicial e último trabalho)",
  "Carteira de Identidade (RG)",
  "Título de Eleitor",
  "CPF",
  "Certificado Reservista",
  "Comprovante de Endereço em seu nome",
  "Certidão de Nascimento ou Casamento (RG e CPF do cônjuge)",
  "Certidão de Nascimento, RG e CPF dos filhos",
  "Diploma e Histórico de Nível Superior, ou Declaração da Faculdade com Histórico Escolar se estiver em curso",
  "Caso tenha certificações, cópia das mesmas",
  "Conta Corrente Banco Santander (Se já possuir)"
];

export interface MyFormData {
  arquivos: FileList;
  estadoCivil: string;
  escolaridade: string;
  racaOuCor: string;
  nomeDoPai: string;
  nomeDaMae: string;
  enderecoCompleto: string;
  cidade: string;
  cpf: string;
  dataDeNascimento: string;
  rg: string;
  email: string;
  nome: string;
  contaCorrente: string
  cep: string
  sexo: string
  telefone: number
}

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MyFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<MyFormData> = (data: MyFormData) => {
    console.log("Form data:", data);
    const files = data.arquivos;

    for (let i = 0; i < files.length; i++) {
      console.log("Arquivo selecionado:", files[i]);
    }
  };

  const handleStatusCivilChange = (event: any) => {
    setValue("estadoCivil", event);
  };


  const handleEscolaridadeChange = (event: any) => {
    setValue("escolaridade", event);
  };

  const handleRaceChange = (event: any) => {
    setValue("racaOuCor", event);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold text-primary-500 mb-6">Olá, futuro (a) Celler!</h1>
          <p className="text-lg mb-8">Envie os seguintes documentos:</p>
          <ul className="list-disc list-inside text-left space-y-2 mb-8 text-gray-700">
            {documents.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-8 mb-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="text-lg font-medium text-gray-800">
                Nome <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="nome"
                placeholder="Informe seu nome"
                {...register("nome")}
                error={errors.nome ? true : false}

              />
              {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message as string}</p>}
            </div>
            <div>
              <label htmlFor="dataDeNascimento" className="text-lg font-medium text-gray-800">
                Data de Nascimento <span className="text-red-500">*</span>
              </label>
              <TextInput
                id="dataDeNascimento"
                placeholder="DDMMYYYY"
                {...register("dataDeNascimento")}
                minLength={8}
                maxLength={8}
                error={errors.dataDeNascimento ? true : false}

              />
              {errors.dataDeNascimento && <p className="text-red-500 text-sm mt-1">{errors.dataDeNascimento.message as string}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-lg font-medium text-gray-800">
                Email <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="email"
                id="email"
                placeholder="Informe seu email"
                {...register("email")}
                error={errors.email ? true : false}

              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
            </div>
            <div>
              <label htmlFor="telefone" className="text-lg font-medium text-gray-800">
                Telefone <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="number"
                id="telefone"
                placeholder="(XX) XXXXX-XXXX"
                {...register("telefone")}
                error={errors.telefone ? true : false}
                maxLength={15}
              />
              {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone.message as string}</p>}
            </div>
            <div>
              <label htmlFor="rg" className="text-lg font-medium text-gray-800">
                Carteira de Identidade (RG) <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="rg"
                placeholder="Informe seu RG"
                {...register("rg")}
                minLength={9}
                maxLength={9}
                error={errors.rg ? true : false}

              />
              {errors.rg && (
                <p className="text-red-500 text-sm mt-1">{errors.rg.message as string}</p>
              )}
            </div>
            <div>
              <label htmlFor="cpf" className="text-lg font-medium text-gray-800">
                CPF <span className="text-red-500">*</span>
              </label>
              <CpfInput
                register={register}
                name="cpf"
                value={watch("cpf")}
                setValue={setValue}
                error={errors.cpf ? true : false}
              />
              {errors.cpf && (
                <p className="text-red-500 text-sm mt-1">{errors.cpf.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="cidade" className="text-lg font-medium text-gray-800">
                Local de nascimento <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="cidade"
                placeholder="Informe seu local de nascimento"
                {...register("cidade")}
                error={errors.cidade ? true : false}
              />
              {errors.cidade && (
                <p className="text-red-500 text-sm mt-1">{errors.cidade.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="enderecoCompleto" className="text-lg font-medium text-gray-800">
                Endereço completo <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="enderecoCompleto"
                placeholder="Informe seu endereço completo"
                {...register("enderecoCompleto")}
                error={errors.enderecoCompleto ? true : false}

              />
              {errors.enderecoCompleto && (
                <p className="text-red-500 text-sm mt-1">{errors.enderecoCompleto.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="cep" className="text-lg font-medium text-gray-800">
                CEP <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="bairro"
                placeholder="Informe seu CEP"
                {...register("cep")}
                error={errors.cep ? true : false}
                minLength={8}
                maxLength={8}
              />
              {errors.cep && (
                <p className="text-red-500 text-sm mt-1">{errors.cep.message as string}</p>
              )}
            </div>
            <div>
              <label htmlFor="nomeDaMae" className="text-lg font-medium text-gray-800">
                Nome da mãe <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="nomeDaMae"
                placeholder="Informe o nome da sua mãe"
                {...register("nomeDaMae")}
                error={errors.nomeDaMae ? true : false}

              />
              {errors.nomeDaMae && (
                <p className="text-red-500 text-sm mt-1">{errors.nomeDaMae.message as string}</p>
              )}
            </div>
            <div>
              <label htmlFor="nomeDoPai" className="text-lg font-medium text-gray-800">
                Nome do pai <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="nomeDoPai"
                placeholder="Informe o nome do seu pai"
                {...register("nomeDoPai")}
                error={errors.nomeDoPai ? true : false}

              />
              {errors.nomeDoPai && (
                <p className="text-red-500 text-sm mt-1">{errors.nomeDoPai.message as string}</p>
              )}
            </div>
            <div>
              <label htmlFor="estadoCivil" className="text-lg font-medium text-gray-800">
                Estado Civil <span className="text-red-500">*</span>
              </label>
              <Select
                id="estadoCivil"
                {...register("estadoCivil")}
                placeholder="Selecione seu estado civil"
                onChange={handleStatusCivilChange}
                value={watch("estadoCivil") || ""}
                error={errors.estadoCivil ? true : false}

              >
                <SelectItem value="Solteiro">Solteiro</SelectItem>
                <SelectItem value="Casado">Casado</SelectItem>
                <SelectItem value="Divorciado">Divorciado</SelectItem>
                <SelectItem value="Viúvo">Viúvo</SelectItem>
              </Select>
              {errors.estadoCivil && (
                <p className="text-red-500 text-sm mt-1">{errors.estadoCivil.message as string}</p>
              )}
            </div>
            <div>
              <label htmlFor="escolaridade" className="text-lg font-medium text-gray-800">
                Escolaridade <span className="text-red-500">*</span>
              </label>
              <Select
                id="escolaridade"
                {...register("escolaridade")}
                placeholder="Selecione sua escolaridade"
                onChange={handleEscolaridadeChange}
                value={watch("escolaridade") || ""}
                error={errors.escolaridade ? true : false}
              >
                <SelectItem value="Fundamental Completo">Ensino Fundamental Completo</SelectItem>
                <SelectItem value="Analfabeto">Analfabeto</SelectItem>
                <SelectItem value="Fundamental Incompleto">Até 4ª Série Incompleto</SelectItem>
                <SelectItem value="Medio Incompleto">Ensino Médio Incompleto</SelectItem>
                <SelectItem value="Medio Completo">Ensino Médio Completo</SelectItem>
                <SelectItem value="Superior Incompleto">Ensino Superior Incompleto</SelectItem>
                <SelectItem value="Superior Completo">Ensino Superior Completo</SelectItem>
                <SelectItem value="Pós">Pós</SelectItem>
                <SelectItem value="Graduação">Graduação</SelectItem>
                <SelectItem value="Mestrado">Mestrado</SelectItem>

              </Select>
              {errors.escolaridade && (
                <p className="text-red-500 text-sm mt-1">{errors.escolaridade.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="sexo" className="text-lg font-medium text-gray-800">
                Sexo <span className="text-red-500">*</span>
              </label>
              <Select
                id="sexo"
                {...register("sexo")}
                placeholder="Selecione seu sexo"
                onChange={handleRaceChange}
                value={watch("sexo") || ""}
                error={errors.sexo ? true : false}
              >
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Feminino">Feminino</SelectItem>
              </Select>
              {errors.sexo && (
                <p className="text-red-500 text-sm mt-1">{errors.sexo.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="racaOuCor" className="text-lg font-medium text-gray-800">
                Raça/Cor <span className="text-red-500">*</span>
              </label>
              <Select
                id="racaOuCor"
                {...register("racaOuCor")}
                placeholder="Selecione sua raça/cor"
                onChange={handleRaceChange}
                value={watch("racaOuCor") || ""}
                error={errors.racaOuCor ? true : false}
              >
                <SelectItem value="Branco">Branco</SelectItem>
                <SelectItem value="Negro">Negro</SelectItem>
                <SelectItem value="Pardo">Pardo</SelectItem>
                <SelectItem value="Indígena">Indígena</SelectItem>
                <SelectItem value="Amarelo">Amarelo</SelectItem>
              </Select>
              {errors.racaOuCor && (
                <p className="text-red-500 text-sm mt-1">{errors.racaOuCor.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="contaCorrente" className="text-lg font-medium text-gray-800">
                Conta corrente Banco Santander <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="contaCorrente"
                placeholder="Informe sua conta corrente do Banco Santander"
                {...register("contaCorrente")}
                error={errors.contaCorrente ? true : false}

              />
              {errors.contaCorrente && (
                <p className="text-red-500 text-sm mt-1">{errors.contaCorrente.message as string}</p>
              )}
            </div>
            <div>
              <label htmlFor="file-1" className="text-lg font-medium text-gray-800">
                Upload de Arquivos <span className="text-red-500">*</span>
              </label>
              <input
                id="file-1"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                multiple
                {...register("arquivos")}
              />
              {errors.arquivos && <p className="text-red-500 text-sm mt-1">{errors.arquivos.message as string}</p>}
              <p className="mt-2 text-sm text-gray-600">Você pode fazer upload de múltiplos arquivos PDF, JPG, PNG, ou DOCX.</p>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6">
            <Button type="submit" variant="primary">
              Enviar
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
