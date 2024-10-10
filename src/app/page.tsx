"use client";

import { Header } from "@/components/layout-component/Header";
import { Button } from "@tremor/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  rg: z.any().refine((file) => file?.length > 0, "RG é obrigatório"),
  cpf: z.any().refine((file) => file?.length > 0, "CPF é obrigatório"),
  comprovanteResidencia: z.any().refine((file) => file?.length > 0, "Comprovante de residência é obrigatório"),
  certidaoNascimento: z.any().refine((file) => file?.length > 0, "Certidão de Nascimento é obrigatório"),
  tituloEleitor: z.any().refine((file) => file?.length > 0, "Título de Eleitor é obrigatório para o titular"),
  rgDependente: z.any().optional(),
  cpfDependente: z.any().optional(),
  parentesco: z.any().optional(),
  dependenteIR: z.any().optional(),
  comprovanteConclusao: z.any().optional(),
  dadosBancarios: z.string(),
});

export interface MyFormData {
  rg: FileList;
  cpf: FileList;
  comprovanteResidencia: FileList;
  certidaoNascimento: FileList;
  tituloEleitor: FileList;
  rgDependente?: FileList;
  cpfDependente?: FileList;
  parentesco?: FileList;
  dependenteIR?: FileList;
  comprovanteConclusao?: FileList;
  dadosBancarios: string
}

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<MyFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<MyFormData> = (data: MyFormData) => {
    console.log("Form data:", data);
    const files = Object.entries(data);

    files.forEach(([key, fileList]) => {
      if (fileList) {
        console.log(`${key} selecionado:`, fileList);
      }
    });
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold text-primary-500 mb-6">Envio de Documentos</h1>
          <p className="text-lg mb-8">Envie os documentos obrigatórios abaixo:</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-8 mb-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="rg" className="text-lg font-medium text-gray-800">
                RG <span className="text-red-500">*</span>
              </label>
              <input
                id="rg"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("rg")}
              />
              {errors.rg && <p className="text-red-500 text-sm mt-1">{errors.rg.message}</p>}
            </div>

            <div>
              <label htmlFor="cpf" className="text-lg font-medium text-gray-800">
                CPF <span className="text-red-500">*</span>
              </label>
              <input
                id="cpf"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("cpf")}
              />
              {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>}
            </div>

            <div>
              <label htmlFor="comprovanteResidencia" className="text-lg font-medium text-gray-800">
                Comprovante de Residência <span className="text-red-500">*</span>
              </label>
              <input
                id="comprovanteResidencia"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("comprovanteResidencia")}
              />
              {errors.comprovanteResidencia && <p className="text-red-500 text-sm mt-1">{errors.comprovanteResidencia.message}</p>}
            </div>

            <div>
              <label htmlFor="certidaoNascimento" className="text-lg font-medium text-gray-800">
                Certidão de Nascimento <span className="text-red-500">*</span>
              </label>
              <input
                id="certidaoNascimento"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("certidaoNascimento")}
              />
              {errors.certidaoNascimento && <p className="text-red-500 text-sm mt-1">{errors.certidaoNascimento.message}</p>}
            </div>

            <div>
              <label htmlFor="tituloEleitor" className="text-lg font-medium text-gray-800">
                Título de Eleitor (Titular) <span className="text-red-500">*</span>
              </label>
              <input
                id="tituloEleitor"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("tituloEleitor")}
              />
              {errors.tituloEleitor && <p className="text-red-500 text-sm mt-1">{errors.tituloEleitor.message}</p>}
            </div>

            <div>
              <label htmlFor="rgDependente" className="text-lg font-medium text-gray-800">
                RG (Dependente)
              </label>
              <input
                id="rgDependente"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("rgDependente")}
              />
            </div>

            <div>
              <label htmlFor="cpfDependente" className="text-lg font-medium text-gray-800">
                CPF (Dependente)
              </label>
              <input
                id="cpfDependente"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("cpfDependente")}
              />
            </div>

            <div>
              <label htmlFor="parentesco" className="text-lg font-medium text-gray-800">
                Comprovante de Parentesco (Opcional)
              </label>
              <input
                id="parentesco"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("parentesco")}
              />
            </div>

            <div>
              <label htmlFor="dependenteIR" className="text-lg font-medium text-gray-800">
                Dependente no IR? (Opcional)
              </label>
              <input
                id="dependenteIR"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("dependenteIR")}
              />
            </div>
            <div>
              <label htmlFor="dependenteIR" className="text-lg font-medium text-gray-800">
                Se cursando, comprovante de conclusão (Opcional)
              </label>
              <input
                id="comprovanteConclusao"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("comprovanteConclusao")}
              />
            </div>
            <div>
              <label htmlFor="dadosBancarios" className="text-lg font-medium text-gray-800">
                Dados bancários
              </label>
              <input
                id="dadosBancarios"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                {...register("dadosBancarios")}
              />
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
